import React from 'react'
import { ArrowLeft, Shield, Heart, Users, AlertTriangle, Eye, Lock, Ban } from 'lucide-react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'

export function CommunityRulesPage() {
  const handleGoBack = () => {
    window.history.back()
  }

  const rules = [
    {
      icon: Ban,
      title: "Nada de odio",
      description: "Está totalmente prohibido publicar mensajes que inciten al odio o la violencia, como discursos racistas, sexistas, homofóbicos, transfóbicos, xenófobos o cualquier tipo de discriminación.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Users,
      title: "No al acoso",
      description: "No se permite el acoso, hostigamiento ni intimidación hacia otras personas, públicas o privadas.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Heart,
      title: "Evita insultos o lenguaje ofensivo",
      description: "Este es un espacio para expresarse con cariño o sinceridad, no para herir. Los mensajes con insultos, groserías o lenguaje agresivo serán eliminados.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Eye,
      title: "Contenido sexual explícito: prohibido",
      description: "No está permitido compartir contenido sexual explícito, sugerente o que pueda resultar incómodo para otras personas.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: AlertTriangle,
      title: "Nada de violencia ni amenazas",
      description: "No publiques mensajes que contengan amenazas, violencia o referencias al daño físico o psicológico.",
      color: "from-red-600 to-red-700"
    },
    {
      icon: Shield,
      title: "No se permite promover actividades ilegales",
      description: "Está prohibido publicar mensajes que incentiven el consumo de drogas, alcohol u otras actividades ilegales.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Lock,
      title: "Respeto a la privacidad",
      description: "No compartas información personal, tuya ni de otras personas (nombres completos, redes sociales, teléfonos, etc.).",
      color: "from-blue-500 to-blue-600"
    }
  ]

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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 font-playfair">
              Normas de la Comunidad
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg font-light font-poppins leading-relaxed">
            Reglas y directrices para mantener un ambiente seguro y respetuoso
          </p>
        </div>

        {/* Moderation Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 font-poppins mb-2">
                Moderación activa
              </h3>
              <p className="text-blue-700 dark:text-blue-200 font-poppins leading-relaxed">
                Este sitio cuenta con un sistema de moderación automática y revisión manual para asegurar que los mensajes cumplan con las normas de respeto y seguridad. Los mensajes que no respeten estas reglas serán eliminados, y quienes las infrinjan de forma reiterada podrán ser bloqueados.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 text-lg font-poppins leading-relaxed text-center">
            Queremos que este espacio siga siendo seguro, respetuoso y bonito para todas las personas. Por eso, te pedimos que sigas estas normas al enviar tu mensaje anónimo:
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {rules.map((rule, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${rule.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <rule.icon className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins mb-3">
                    {rule.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-200 dark:border-pink-800 p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="text-pink-600 dark:text-pink-400" size={24} />
              <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100 font-poppins">
                Gracias por hacer de este un lugar mejor
              </h3>
            </div>
            <p className="text-pink-700 dark:text-pink-200 font-poppins">
              Tu respeto hacia estas normas ayuda a mantener un ambiente donde todos se sientan seguros para expresar sus sentimientos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}