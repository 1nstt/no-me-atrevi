import { useState, useEffect } from "react"
import { ArrowLeft, AlertTriangle, Loader2, ShieldCheck, LogOut, Search, Home, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/Button"
import { ReportedCardModal } from "./ReportedCardModal"
import { useAuth } from "./context/AuthContext"
import { BACKEND_URL } from "../config"

export function ReportedCardsDashboard({ onBack }) {
  const [reportedCards, setReportedCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const fetchReportedCards = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/cards/reports`, {
        credentials: 'include' // Incluir cookies de autenticación
      })
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      const data = await response.json()
      
      // 🔍 LOG PARA DEBUGGEAR LA ESTRUCTURA DE DATA
      console.log("📋 Estructura de data recibida:", data)
      console.log("📋 Tipo de data:", typeof data)
      console.log("📋 Es array?:", Array.isArray(data))
      
      // Usar directamente reportedCards del endpoint
      const cardsArray = data.reportedCards || []
      console.log("📋 Cartas reportadas encontradas:", cardsArray.length)
      
      // Mostrar todas las cartas reportadas (sin filtro adicional)
      setReportedCards(cardsArray)
    } catch (err) {
      console.error("Error fetching reported cards:", err)
      setError("No se pudieron cargar las cartas reportadas.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReportedCards()
  }, [])

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleCloseModal = () => {
    setSelectedCard(null)
  }

  const handleGoToCards = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/vixonpaleta')
  }

  const handleAnalyzeCardsClick = () => {
    setShowAnalyzeModal(true)
  }

  const handleConfirmAnalyze = async () => {
    try {
      setIsAnalyzing(true)
      setShowAnalyzeModal(false)
      console.log("🔍 Iniciando análisis de cartas...")
      
      const response = await fetch(`${BACKEND_URL}/api/admin/cards/analyze`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log("✅ Análisis completado:", result)
        alert(`Análisis completado exitosamente. Se procesaron las cartas.`)
        // Recargar las cartas reportadas para mostrar los nuevos resultados
        await fetchReportedCards()
      } else {
        const error = await response.json()
        console.error("❌ Error en análisis:", error)
        alert(`Error al analizar cartas: ${error.message}`)
      }
    } catch (err) {
      console.error("Error analyzing cards:", err)
      alert("Error al analizar las cartas")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCancelAnalyze = () => {
    setShowAnalyzeModal(false)
  }

  const handleRejectReports = async () => {
    try {
      console.log("Mantener carta (rechazar reportes):", selectedCard._id)
      const response = await fetch(`${BACKEND_URL}/api/admin/cards/reports/decline/${selectedCard._id}`, {
        method: 'PATCH',
        credentials: 'include'
      })
      
      if (response.ok) {
        await fetchReportedCards()
        handleCloseModal()
        alert('Carta mantenida exitosamente')
      } else {
        const error = await response.json()
        alert(`Error al mantener carta: ${error.message}`)
      }
    } catch (err) {
      console.error("Error rejecting reports:", err)
      alert("Error al mantener la carta")
    }
  }

  const handleAcceptReports = async () => {
    try {
      console.log("Eliminar carta (aceptar reportes):", selectedCard._id)
      const response = await fetch(`${BACKEND_URL}/api/admin/cards/reports/accept/${selectedCard._id}`, {
        method: 'PATCH',
        credentials: 'include'
      })
      
      if (response.ok) {
        await fetchReportedCards()
        handleCloseModal()
        alert('Carta eliminada exitosamente')
      } else {
        const error = await response.json()
        alert(`Error al eliminar carta: ${error.message}`)
      }
    } catch (err) {
      console.error("Error accepting reports:", err)
      alert("Error al eliminar la carta")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-12 w-12 text-purple-500" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando reportes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchReportedCards} className="mt-4">
          Reintentar
        </Button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={handleGoToCards}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm sm:text-base bg-transparent"
        >
          <Home size={18} />
          Ir a cartas
        </Button>
        
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 font-playfair">
          Dashboard de Cartas Reportadas
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleAnalyzeCardsClick}
            disabled={isAnalyzing}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 border-purple-300 dark:border-purple-600 hover:border-purple-500 disabled:opacity-50"
          >
            <Search size={18} />
            {isAnalyzing ? 'Analizando...' : 'Analizar cartas'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border-red-300 dark:border-red-600 hover:border-red-500"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {reportedCards.length === 0 ? (
        <div className="text-center py-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
              No hay cartas con reportes pendientes.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">¡Todo está en orden por ahora!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportedCards.map((card) => (
            <div
              key={card._id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-slate-700"
              onClick={() => handleCardClick(card)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins">Para: {card.to}</h3>
                <div className="flex items-center gap-1 text-red-500">
                  <AlertTriangle size={16} />
                  <span className="font-medium">{card.reportsCounter}</span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 truncate-2-lines font-poppins">
                {card.message}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-poppins">
                Enviado: {new Date(card.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Confirmación de Análisis */}
      {showAnalyzeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 dark:text-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-4 dark:border-slate-700">
                <h2 className="text-xl font-bold font-playfair">Confirmar Análisis</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleCancelAnalyze}
                  className="dark:text-gray-400 dark:hover:bg-slate-700 hover:bg-gray-100"
                >
                  <X size={20} />
                  <span className="sr-only">Cerrar modal</span>
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-medium font-poppins">¿Estás seguro?</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-poppins">
                      Esta acción analizará TODAS las cartas del sistema
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 font-poppins">
                    <strong>Importante:</strong> El análisis revisará todas las cartas y marcará automáticamente como reportadas aquellas que contengan contenido inapropiado según el sistema de moderación.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancelAnalyze}
                  className="flex items-center gap-2 bg-transparent dark:text-gray-300 dark:hover:bg-slate-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmAnalyze}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Search size={16} />
                  Confirmar Análisis
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCard && (
        <ReportedCardModal
          card={selectedCard}
          onClose={handleCloseModal}
          onRejectReports={handleRejectReports}
          onAcceptReports={handleAcceptReports}
        />
      )}
    </div>
  )
}