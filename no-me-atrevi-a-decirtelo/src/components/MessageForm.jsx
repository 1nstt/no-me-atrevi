import React, { useState } from 'react'
import { Send, ArrowLeft, Heart, AlertTriangle } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { BACKEND_URL } from '../config'

export function MessageForm({ onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    to: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', 'offensive', null
  const [errorMessage, setErrorMessage] = useState('')
  const [offensiveWords, setOffensiveWords] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar errores cuando el usuario empiece a escribir
    if (submitStatus === 'error' || submitStatus === 'offensive') {
      setSubmitStatus(null)
      setErrorMessage('')
      setOffensiveWords(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.to.trim() || !formData.message.trim()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')
    setOffensiveWords(null)

    try {
      const response = await fetch(`${BACKEND_URL}/api/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.to.trim(),
          message: formData.message.trim()
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Verificar si es un error de palabras ofensivas
        if (response.status === 400 && result.offensiveWords) {
          setSubmitStatus('offensive')
          setOffensiveWords(result.offensiveWords)
          
          // Crear lista de todas las palabras ofensivas encontradas
          const allOffensiveWords = [
            ...result.offensiveWords.to,
            ...result.offensiveWords.message
          ]
          const uniqueWords = [...new Set(allOffensiveWords)]
          
          setErrorMessage(`Error: el formulario no puede contener estas palabras: ${uniqueWords.join(', ')}`)
        } else {
          setSubmitStatus('error')
          setErrorMessage(result.message || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
        }
        return
      }

      console.log('Mensaje enviado:', result)
      
      setSubmitStatus('success')
      setFormData({ to: '', message: '' })
      
      // Opcional: llamar callback si se proporciona
      if (onSubmit) {
        onSubmit(result)
      }

      // Volver a la vista principal después de 2 segundos
      setTimeout(() => {
        onBack()
      }, 2000)

    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setSubmitStatus('error')
      setErrorMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.to.trim() && formData.message.trim()

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 mx-auto">
                <Heart className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-playfair">
              ¡Mensaje enviado!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-poppins">
              Tu mensaje ha sido compartido anónimamente. Gracias por confiar en nosotros.
            </p>
            <div className="animate-pulse text-sm text-gray-500 dark:text-gray-400">
              Regresando en unos segundos...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-4 sm:py-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm sm:text-base"
          >
            <ArrowLeft size={18} />
            Volver
          </Button>
        </div>

        {/* Title Section */}
        <div className="mb-6 sm:mb-8 text-center px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 leading-tight tracking-wide font-playfair">
            Comparte tu mensaje
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-base sm:text-lg font-light tracking-wide transition-colors duration-300 font-poppins">
            Escribe lo que nunca te atreviste a decir. Tu mensaje será compartido anónimamente.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden transition-all duration-300">
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* To Field */}
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                  Para quien es el mensaje
                </label>
                <Input
                  id="to"
                  name="to"
                  type="text"
                  placeholder="Nombre de la persona..."
                  value={formData.to}
                  onChange={handleInputChange}
                  className={`text-sm sm:text-base h-11 sm:h-12 font-poppins ${
                    submitStatus === 'offensive' && offensiveWords?.to?.length > 0
                      ? 'border-red-300 dark:border-red-600 focus-visible:ring-red-500'
                      : ''
                  }`}
                  disabled={isSubmitting}
                />
                {submitStatus === 'offensive' && offensiveWords?.to?.length > 0 && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-poppins">
                    Palabras no permitidas en este campo: {offensiveWords.to.join(', ')}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                  Tu mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Escribe aquí lo que nunca te atreviste a decir..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  maxLength={230}
                  disabled={isSubmitting}
                  className={`flex w-full rounded-lg border bg-white dark:bg-slate-800 px-4 py-3 text-sm sm:text-base placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 dark:text-white resize-none font-poppins transition-all duration-300 leading-relaxed ${
                    submitStatus === 'offensive' && offensiveWords?.message?.length > 0
                      ? 'border-red-300 dark:border-red-600 focus-visible:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus-visible:ring-purple-500'
                  }`}
                />
                {submitStatus === 'offensive' && offensiveWords?.message?.length > 0 && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-poppins">
                    Palabras no permitidas en este campo: {offensiveWords.message.join(', ')}
                  </p>
                )}
                <div className="mt-2 text-right">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formData.message.length}/230 caracteres
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {(submitStatus === 'error' || submitStatus === 'offensive') && (
                <div className={`p-4 border rounded-lg ${
                  submitStatus === 'offensive' 
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle 
                      size={16} 
                      className={
                        submitStatus === 'offensive' 
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-red-600 dark:text-red-400'
                      }
                    />
                    <p className={`text-sm font-poppins ${
                      submitStatus === 'offensive' 
                        ? 'text-amber-700 dark:text-amber-300'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-poppins disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 justify-center sm:justify-start">
              <Heart size={14} />
              <span className="font-poppins">Tu mensaje será completamente anónimo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}