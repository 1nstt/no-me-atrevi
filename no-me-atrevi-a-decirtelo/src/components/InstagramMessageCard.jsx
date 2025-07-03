import React, { useState } from 'react'
import { Heart, MoreHorizontal, RotateCcw } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/Avatar'

export function InstagramMessageCard({ to, message, timeAgo }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative w-full h-full flip-card">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card */}
        <div className="flip-card-front bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-slate-900/50 flex flex-col h-full">
          {/* Card Header - Recipient */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 dark:border-slate-700 transition-colors duration-300 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-gray-200 dark:border-slate-600 transition-colors duration-300 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800 text-gray-500 dark:text-gray-400 text-xs transition-colors duration-300">
                  {to.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm text-gray-900 dark:text-white transition-colors duration-300 truncate">
                  Para {to}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={handleFlip}
                className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                title="Voltear tarjeta"
              >
                <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <MoreHorizontal size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Card Content - Instagram DM Style */}
          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-300 flex-1 min-h-0">
            {/* Date separator */}
            <div className="text-center mb-3 sm:mb-4 flex-shrink-0">
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-2 sm:px-3 py-1 rounded-full transition-colors duration-300">
                {timeAgo}
              </span>
            </div>

            {/* Message container */}
            <div className="flex flex-col space-y-2 flex-1 justify-end">
              {/* Sender info - small text above message */}
              <div className="self-end text-xs text-gray-500 dark:text-gray-400 mr-2 transition-colors duration-300 flex-shrink-0">
                No me atreví a decírtelo
              </div>

              {/* Message bubble */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl sm:rounded-3xl rounded-br-sm px-3 sm:px-4 py-2 sm:py-3 max-w-[85%] shadow-sm">
                  <p className="text-xs sm:text-sm whitespace-pre-wrap break-words leading-relaxed">{message}</p>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex justify-end items-center gap-1 mr-1 flex-shrink-0">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  Enviado
                </span>
                <Heart size={10} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300 flex-shrink-0">
            <div className="w-full">
              <div className="bg-gray-100 dark:bg-slate-700 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 text-center">
                Mensaje enviado anónimamente
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl overflow-hidden shadow-md border border-purple-200 dark:border-purple-700 transition-all duration-300 flex flex-col h-full">
          {/* Back Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-purple-200 dark:border-purple-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">?</span>
              </div>
              <div>
                <div className="font-medium text-sm text-purple-900 dark:text-purple-100">Contenido especial</div>
              </div>
            </div>
            <button
              onClick={handleFlip}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-300 p-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-800/30"
              title="Voltear tarjeta"
            >
              <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>

          {/* Back Content */}
          <div className="p-4 sm:p-6 flex flex-col items-center justify-center flex-1 text-center">
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Heart className="text-white" size={20} />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-purple-900 dark:text-purple-100 mb-2 sm:mb-3 font-playfair">
              Lado oculto
            </h3>
            <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-200 leading-relaxed font-poppins mb-4">
              Aquí podrías mostrar información adicional, reacciones, comentarios o cualquier contenido especial relacionado con este mensaje.
            </p>
            <div className="mt-auto text-xs text-purple-600 dark:text-purple-300 font-medium">Para: {to}</div>
          </div>
        </div>
      </div>
    </div>
  )
}