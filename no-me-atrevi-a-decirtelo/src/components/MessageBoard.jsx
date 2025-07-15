import React, { useState, useEffect, useRef, useCallback } from 'react'
import { InstagramMessageCard } from './InstagramMessageCard'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'
import { Settings, MessageCircle, ChevronDown, Loader2 } from 'lucide-react'

export function MessageBoard({ searchTerm, onSearchChange }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [showAllMessages, setShowAllMessages] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false)
  const [showLoadAllButton, setShowLoadAllButton] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const gridRef = useRef(null)

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
  const fetchAllMessages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/api/cards/lastest`)
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
      console.error('Error fetching messages:', error)
      setError(error.message)
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener TODOS los mensajes activos
  const fetchAllActiveMessages = async () => {
    try {
      setLoadingAll(true)
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
      setLoadingAll(false)
    }
  }

  // Función para buscar mensajes por destinatario
  const searchMessagesByTo = async (searchTerm) => {
    try {
      setIsSearching(true)
      setError(null)
      
      const response = await fetch(`${BACKEND_URL}/api/cards/search/${encodeURIComponent(searchTerm)}`)
      console.log('Searching messages for:', searchTerm)
      
      if (response.status === 404) {
        // No se encontraron resultados
        setMessages([])
        setShowLoadAllButton(false)
        return
      }
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      setMessages(data.cards || [])
      setShowLoadAllButton(false) // No mostrar botón en búsquedas
    } catch (error) {
      console.error('Error searching messages:', error)
      setError(error.message)
      setMessages([])
      setShowLoadAllButton(false)
    } finally {
      setIsSearching(false)
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

  // Effect para cargar mensajes iniciales y conteo
  useEffect(() => {
    fetchAllMessages()
    fetchTotalCount()
  }, [])

  // Effect para manejar búsquedas
  useEffect(() => {
    if (searchTerm && searchTerm.trim()) {
      searchMessagesByTo(searchTerm.trim())
    } else {
      fetchAllMessages()
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

  const isLoadingState = loading || isSearching

  if (isLoadingState) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          {isSearching ? 'Buscando...' : 'Cargando...'}
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
          onClick={() => searchTerm ? searchMessagesByTo(searchTerm) : fetchAllMessages()}
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
            {searchTerm 
              ? `${messages.length.toLocaleString()} encontrados de ${totalCount.toLocaleString()} mensajes`
              : `Mostrando ${messages.length.toLocaleString()} de ${totalCount.toLocaleString()} mensajes compartidos`
            }
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
            disabled={loadingAll}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAll ? (
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