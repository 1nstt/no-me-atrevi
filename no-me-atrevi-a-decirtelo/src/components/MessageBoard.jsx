import React, { useState, useEffect } from 'react'
import { InstagramMessageCard } from './InstagramMessageCard'
import { BACKEND_URL } from '../config'
export function MessageBoard() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/cards`)
        console.log('Fetching messages from:', `${BACKEND_URL}/api/cards`)
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }
        
        const data = await response.json()
        setMessages(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching messages:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} className="w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
            <InstagramMessageCard 
              to={message.to} 
              message={message.message} 
              timeAgo={message.timeAgo} 
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">💌</span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
                No hay mensajes disponibles
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                ¡Sé el primero en enviar un mensaje anónimo!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}