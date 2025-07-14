import React, { useState, useEffect } from 'react'
import { InstagramMessageCard } from './InstagramMessageCard'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'
import { Settings } from 'lucide-react'

export function MessageBoard({ searchTerm, onSearchChange }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Función para obtener todos los mensajes
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
    } catch (error) {
      console.error('Error fetching messages:', error)
      setError(error.message)
      setMessages([])
    } finally {
      setLoading(false)
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
        return
      }
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      setMessages(data.cards || [])
    } catch (error) {
      console.error('Error searching messages:', error)
      setError(error.message)
      setMessages([])
    } finally {
      setIsSearching(false)
    }
  }

  // Effect para cargar mensajes iniciales
  useEffect(() => {
    fetchAllMessages()
  }, [])

  // Effect para manejar búsquedas
  useEffect(() => {
    if (searchTerm && searchTerm.trim()) {
      searchMessagesByTo(searchTerm.trim())
    } else {
      fetchAllMessages()
    }
  }, [searchTerm])

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr pt-16">
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
    </div>
  )
}