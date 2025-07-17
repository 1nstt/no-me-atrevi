import React from 'react'
import { ArrowLeft, Heart, ExternalLink, Shield, Coffee } from 'lucide-react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'

export function DonationsPage() {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={18} />
            Volver
          </Button>
          <ThemeToggle />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500 font-playfair">
              Donaciones
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg font-light font-poppins">
            La página por ahora no genera ingresos y mantenerla tiene su costo, así que cualquier apoyo que nos ayude a seguir con este proyecto es más que bienvenido. Gracias por dejar un mensajito :3
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* PayPal Donation Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Coffee className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                  Apoya este proyecto
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg font-poppins leading-relaxed mb-8">
                Si este espacio te ha servido de algo, considera hacer una pequeña donación para ayudarnos a mantenerlo en funcionamiento.
              </p>

              <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-xl border border-pink-200 dark:border-pink-800 p-6 mb-6">
                <a 
                  href="https://www.paypal.com/paypalme/prodchmlo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                  <Heart size={20} />
                  Donar via PayPal
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Transparency Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 font-poppins mb-3">
                  Transparencia
                </h3>
                <p className="text-blue-700 dark:text-blue-200 font-poppins leading-relaxed mb-3">
                  El dinero recaudado tiene como prioridad mantener a flote la página y cubrir los costos de hosting, dominio y mantenimiento técnico.
                </p>
                <p className="text-blue-700 dark:text-blue-200 font-poppins leading-relaxed">
                  Esta cuenta PayPal pertenece a uno de los desarrolladores del proyecto y es administrada de forma transparente para los fines mencionados.
                </p>
              </div>
            </div>
          </div>

          {/* Thank You Card */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="text-purple-600 dark:text-purple-400" size={24} />
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 font-poppins">
                  Gracias por tu apoyo
                </h3>
              </div>
              <p className="text-purple-700 dark:text-purple-200 font-poppins leading-relaxed">
                Cada donación, por pequeña que sea, nos ayuda a mantener este espacio donde las palabras no dichas encuentran su lugar. Tu generosidad hace posible que más personas puedan compartir sus sentimientos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}