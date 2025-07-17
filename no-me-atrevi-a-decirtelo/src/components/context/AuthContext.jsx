import { createContext, useState, useContext, useEffect } from 'react'
import { BACKEND_URL } from '../../config'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Función para login
  const login = async (password) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔑 Intentando login con:', { password })
      
      const response = await fetch(`${BACKEND_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Para enviar/recibir cookies
        body: JSON.stringify({ password }),
      })

      const data = await response.json()
      console.log('📨 Respuesta del servidor:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login')
      }

      setIsAuthenticated(true)
      setUser({ role: 'admin' })
      
      return { success: true, message: data.message }
    } catch (err) {
      console.error('❌ Error en login:', err)
      setError(err.message)
      setIsAuthenticated(false)
      setUser(null)
      
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Función para logout
  const logout = async () => {
    try {
      setLoading(true)
      
      // Llamar al endpoint de logout del backend
      await fetch(`${BACKEND_URL}/api/admin/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Error en logout:', err)
    } finally {
      setIsAuthenticated(false)
      setUser(null)
      setError(null)
      setLoading(false)
    }
  }

  // Función para verificar si el usuario está autenticado
  const checkAuth = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(`${BACKEND_URL}/api/admin/auth/me`, {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(true)
        setUser({ role: 'admin' })
        console.log('✅ Usuario autenticado:', data)
      } else {
        setIsAuthenticated(false)
        setUser(null)
       // console.log('❌ Usuario no autenticado')
      }
    } catch (err) {
      console.error('Error verificando autenticación:', err)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth()
  }, [])

  // Función para limpiar errores
  const clearError = () => {
    setError(null)
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}