import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogIn, User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { useAuth } from "./context/AuthContext"

export function LoginForm({ onBack }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading, error, clearError } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar error cuando el usuario empiece a escribir
    if (error) clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.password.trim()) {
      return
    }

    clearError()

    // Solo enviamos la contraseña, no el username
    const result = await login(formData.password)
    
    if (result.success) {
      // Redirigir al dashboard después del login exitoso
      navigate('/reports')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleBackToCards = () => {
    navigate('/')
  }

  const isFormValid = formData.password.trim()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-8 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Botón Volver a cartas */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleBackToCards}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-transparent border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 font-poppins"
          >
            <ArrowLeft size={18} />
            Volver a cartas
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
            <LogIn className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-playfair">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-poppins">Ingresa tu contraseña para acceder</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden transition-all duration-300">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field - Mantener por compatibilidad visual, pero no es requerido */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins"
                >
                  Nombre de usuario
                </label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Usuario (Obligatorio)"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 h-12 font-poppins"
                    disabled={loading}
                  />
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins"
                >
                  Contraseña *
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 font-poppins"
                    disabled={loading}
                    required
                  />
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 font-poppins">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-base font-poppins disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn size={18} />
                    Iniciar Sesión
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Back to home option - Mantener por compatibilidad */}
        {onBack && (
          <div className="text-center mt-6">
            <button
              onClick={onBack}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-poppins transition-colors"
            >
              ← Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  )
}