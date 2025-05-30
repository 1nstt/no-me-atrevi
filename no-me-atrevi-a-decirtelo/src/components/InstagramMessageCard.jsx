import React, { useState } from 'react'
import { Heart, MoreHorizontal, RotateCcw } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/Avatar'

export function InstagramMessageCard({ to, message, timeAgo }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative h-full min-h-[400px] flip-card">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card */}
        <div className="flip-card-front bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-slate-900/50">
          {/* Card Header - Recipient */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-gray-200 dark:border-slate-600 transition-colors duration-300">
                <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800 text-gray-500 dark:text-gray-400 text-xs transition-colors duration-300">
                  {to.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm text-gray-900 dark:text-white transition-colors duration-300">
                  Para {to}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFlip}
                className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                title="Voltear tarjeta"
              >
                <RotateCcw size={18} />
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Card Content - Instagram DM Style */}
          <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-[180px] flex flex-col transition-colors duration-300">
            {/* Date separator */}
            <div className="text-center mb-4">
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full transition-colors duration-300">
                {timeAgo}
              </span>
            </div>

            {/* Message container */}
            <div className="flex flex-col space-y-2 mt-auto">
              {/* Sender info - small text above message */}
              <div className="self-end text-xs text-gray-500 dark:text-gray-400 mr-2 transition-colors duration-300">
                No me atreví a decírtelo
              </div>

              {/* Message bubble */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl rounded-br-sm px-4 py-3 max-w-[85%] shadow-sm">
                  <p className="text-sm whitespace-pre-wrap">{message}</p>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex justify-end items-center gap-1 mr-1">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  Enviado
                </span>
                <Heart size={10} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center transition-colors duration-300">
            <div className="w-full">
              <div className="bg-gray-100 dark:bg-slate-700 rounded-full px-4 py-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Mensaje enviado anónimamente
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl overflow-hidden shadow-md border border-purple-200 dark:border-purple-700 transition-all duration-300">
          {/* Back Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-200 dark:border-purple-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">?</span>
              </div>
              <div>
                <div className="font-medium text-sm text-purple-900 dark:text-purple-100">Contenido de atrás</div>
              </div>
            </div>
            <button
              onClick={handleFlip}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-300 p-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-800/30"
              title="Voltear tarjeta"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* Back Content */}
          <div className="p-6 flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
                <Heart className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2 font-playfair">
              Lado oculto
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-200 leading-relaxed font-poppins">
              Aquí podrías mostrar información adicional, reacciones, comentarios o cualquier contenido especial
              relacionado con este mensaje.
            </p>
            <div className="mt-4 text-xs text-purple-600 dark:text-purple-300">Para: {to}</div>
          </div>
        </div>
      </div>
    </div>
  )
}