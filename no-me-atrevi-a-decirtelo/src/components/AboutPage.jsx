import React from 'react'
import { ArrowLeft, Info, Heart, Shield, MessageCircle, Users, Instagram } from 'lucide-react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'

export function AboutPage() {
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Info className="text-white" size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 font-playfair">
              Acerca de nomeatrevi
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg font-light font-poppins">
            Conoce más sobre nuestra plataforma y nuestra misión
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Mission Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins mb-3">
                  Nuestra misión
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-poppins leading-relaxed mb-4">
              Somos un proyecto que busca reunir todos esos mensajes que alguna vez quisieron ser enviados, pero que por miedo, distancia, tiempo o simplemente por cómo se dio la vida… nunca llegaron a destino.
            </p>
            <p className="text-gray-600 dark:text-gray-300 font-poppins leading-relaxed">
              Este mural digital es esa última esperanza de que, tal vez, la persona para quien estaba pensado el mensaje lo encuentre algún día.
            </p>
          </div>

          {/* What you can do Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins mb-3">
                  Lo que puedes hacer aquí
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-poppins leading-relaxed mb-4">
              Aquí puedes dejar lo que nunca te atreviste a decir: un "te extraño", un "lo siento", un "te amo", o incluso un simple "gracias".
            </p>
            <p className="text-gray-600 dark:text-gray-300 font-poppins leading-relaxed">
              Creemos que las palabras no dichas también merecen un lugar, y que a veces escribirlas es una forma de sanar, cerrar ciclos o simplemente liberar lo que llevamos dentro.
            </p>
          </div>

          {/* Privacy Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 font-poppins mb-3">
                  Tus mensajes son 100% anónimos
                </h3>
              </div>
            </div>
            <p className="text-blue-700 dark:text-blue-200 font-poppins leading-relaxed mb-4">
              No se recopila ningún tipo de dato personal, IP, nombre ni correo. Solo escribes, envías, y el mensaje se guarda sin que nadie —ni siquiera nosotros— sepa quién lo escribió.
            </p>
            <p className="text-blue-700 dark:text-blue-200 font-poppins leading-relaxed">
              Tu mensaje puede ser libre, sincero y sin miedo. Nadie juzga. Todos tenemos algo que no dijimos.
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Instagram className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 font-poppins mb-3">
                  Contacto
                </h3>
              </div>
            </div>
            <p className="text-indigo-700 dark:text-indigo-200 font-poppins leading-relaxed">
              Si necesitan contactarme, escríbanme al Instagram{' '}
              <a 
                href="https://instagram.com/1980kyoto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-indigo-800 dark:text-indigo-100 hover:text-indigo-900 dark:hover:text-white transition-colors duration-200 underline decoration-2 underline-offset-2"
              >
                @1980kyoto
              </a>
            </p>
          </div>

          {/* Community Card */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 font-poppins mb-3">
                  Una comunidad de corazones
                </h3>
              </div>
            </div>
            <p className="text-purple-700 dark:text-purple-200 font-poppins leading-relaxed">
              Gracias por ser parte de este espacio. Cada mensaje que compartes ayuda a crear un lugar donde las emociones no expresadas encuentran su hogar.
            </p>
          </div>

          {/* Final Message */}
          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="text-gray-600 dark:text-gray-400" size={24} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-poppins">
                  Gracias por ser parte de este espacio
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-poppins">
                Cada historia importa, cada sentimiento cuenta, y cada mensaje no dicho merece ser escuchado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}