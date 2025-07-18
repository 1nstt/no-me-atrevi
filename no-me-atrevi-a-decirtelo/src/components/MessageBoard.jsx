import React, { useState, useEffect, useRef, useCallback } from 'react'
import { InstagramMessageCard } from './InstagramMessageCard'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'
import { Settings, MessageCircle, ChevronDown, Loader2 } from 'lucide-react'

export function MessageBoard({ searchTerm, onSearchChange }) {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [showAllMessages, setShowAllMessages] = useState(false)
  const [showLoadAllButton, setShowLoadAllButton] = useState(false)
  
  // Estado unificado para manejar todas las operaciones de carga
  const [operationState, setOperationState] = useState('idle') // 'idle', 'loading', 'searching', 'loading-all'
  
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const gridRef = useRef(null)
  const abortControllerRef = useRef(null)

  // Función para obtener el conteo total de cartas
  const fetchTotalCount = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cards/count`)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      const data = await response.json()
      setTotalCount(data.count || 0)
    } catch (error) {
      console.error('Error fetching total count:', error)
      setTotalCount(0)
    }
  }

  // Función para obtener todos los mensajes (últimos 150)
  const fetchAllMessages = async (signal) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cards/lastest`, { signal })
      console.log('Fetching all messages from:', `${BACKEND_URL}/api/cards/lastest`)
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      setMessages(data)
      setError(null)
      setShowAllMessages(false)
      setShowLoadAllButton(data.length >= 150) // Mostrar botón solo si hay 150 mensajes
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching messages:', error)
        setError(error.message)
        setMessages([])
        setShowLoadAllButton(false)
      }
    }
  }

  // Función para obtener TODOS los mensajes activos
  const fetchAllActiveMessages = async () => {
    try {
      setOperationState('loading-all')
      const response = await fetch(`${BACKEND_URL}/api/cards/active`)
      console.log('Fetching all active messages from:', `${BACKEND_URL}/api/cards/active`)
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      setMessages(data)
      setShowAllMessages(true)
      setShowLoadAllButton(false)
      setError(null)
    } catch (error) {
      console.error('Error fetching all active messages:', error)
      setError(error.message)
    } finally {
      setOperationState('idle')
    }
  }

  // Función para buscar mensajes por destinatario
  const searchMessagesByTo = async (searchTerm, signal) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cards/search/${encodeURIComponent(searchTerm)}`, { signal })
      console.log('Searching messages for:', searchTerm)
      
      if (response.status === 404) {
        // No se encontraron resultados
        setMessages([])
        setError(null)
        setShowLoadAllButton(false)
        return
      }
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Search response data:', data) // Para debugging
      
      // Verificar si la respuesta tiene la propiedad 'cards' o si es directamente un array
      if (data.cards && Array.isArray(data.cards)) {
        setMessages(data.cards)
      } else if (Array.isArray(data)) {
        setMessages(data)
      } else {
        setMessages([])
      }
      
      setError(null)
      setShowLoadAllButton(false) // No mostrar botón en búsquedas
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error searching messages:', error)
        setError(error.message)
        setMessages([])
        setShowLoadAllButton(false)
      }
    }
  }

  // Función para detectar scroll al final
  const handleScroll = useCallback(() => {
    if (showAllMessages || searchTerm || !showLoadAllButton) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      // Usuario está cerca del final, mostrar botón si no está ya visible
      setShowLoadAllButton(true)
    }
  }, [showAllMessages, searchTerm, showLoadAllButton])

  // Effect para carga inicial SOLO UNA VEZ
  useEffect(() => {
    const initializeData = async () => {
      setOperationState('loading')
      
      const controller = new AbortController()
      abortControllerRef.current = controller
      
      try {
        await Promise.all([
          fetchAllMessages(controller.signal),
          fetchTotalCount()
        ])
      } finally {
        setOperationState('idle')
      }
    }
    
    initializeData()
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Effect para manejar búsquedas
  useEffect(() => {
    // Solo ejecutar si ya pasó la carga inicial
    if (operationState === 'loading') return
    
    // Cancelar cualquier operación en curso
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    const controller = new AbortController()
    abortControllerRef.current = controller
    
    const performSearch = async () => {
      if (searchTerm && searchTerm.trim()) {
        // Limpiar inmediatamente los mensajes antiguos y mostrar estado de búsqueda
        setMessages([])
        setOperationState('searching')
        setError(null)
        setShowLoadAllButton(false)
        
        // Realizar búsqueda
        await searchMessagesByTo(searchTerm.trim(), controller.signal)
      } else {
        // Sin término de búsqueda, cargar mensajes normales
        setMessages([])
        setOperationState('loading')
        setError(null)
        
        await fetchAllMessages(controller.signal)
      }
      
      setOperationState('idle')
    }
    
    performSearch()
    
    return () => {
      if (abortControllerRef.current === controller) {
        controller.abort()
      }
    }
  }, [searchTerm])

  // Effect para scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleAdminClick = () => {
    navigate('/reports')
  }

  const isLoadingState = operationState === 'loading' || operationState === 'searching'
  const isLoadingAll = operationState === 'loading-all'

  if (isLoadingState) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          {operationState === 'searching' ? 'Buscando...' : 'Cargando...'}
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Error al cargar los mensajes: {error}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Por favor, intenta nuevamente más tarde
        </p>
        <button
          onClick={() => {
            if (searchTerm) {
              setOperationState('searching')
              searchMessagesByTo(searchTerm).finally(() => setOperationState('idle'))
            } else {
              setOperationState('loading')
              fetchAllMessages().finally(() => setOperationState('idle'))
            }
          }}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Contador de mensajes totales */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full px-4 py-2 border border-purple-200 dark:border-purple-800">
          <MessageCircle className="text-purple-600 dark:text-purple-400" size={18} />
          <span className="text-purple-700 dark:text-purple-300 font-medium text-sm">
            {totalCount.toLocaleString()} mensajes compartidos
          </span>
        </div>
      </div>

      {/* Botón de Opciones Admin */}
      {isAuthenticated && (
        <div className="absolute top-0 right-0 z-10 mb-4">
          <button
            onClick={handleAdminClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <Settings size={18} />
            Opciones Admin
          </button>
        </div>
      )}

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr pt-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
              <InstagramMessageCard 
                to={message.to} 
                message={message.message} 
                timeAgo={message.timeAgo}
                cardId={message._id}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">{searchTerm ? '🔍' : '💌'}</span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
                  {searchTerm 
                    ? `No se encontraron mensajes para "${searchTerm}"`
                    : 'No hay mensajes disponibles'
                  }
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  {searchTerm 
                    ? 'Intenta con otro nombre o revisa la ortografía'
                    : '¡Sé el primero en enviar un mensaje anónimo!'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botón para cargar todos los mensajes */}
      {showLoadAllButton && !searchTerm && !showAllMessages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={fetchAllActiveMessages}
            disabled={isLoadingAll}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingAll ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Cargando todos los mensajes...
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                Mostrar todos los mensajes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}