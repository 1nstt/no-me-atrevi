import { X, CheckCircle, Ban } from "lucide-react"
import { Button } from "./ui/Button"

export function ReportedCardModal({ card, onClose, onRejectReports, onAcceptReports }) {
  if (!card) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 dark:text-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-3 mb-4 dark:border-slate-700">
            <h2 className="text-xl font-bold font-playfair">Detalles de la Carta Reportada</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="dark:text-gray-400 dark:hover:bg-slate-700 hover:bg-gray-100"
            >
              <X size={20} />
              <span className="sr-only">Cerrar modal</span>
            </Button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">Para:</p>
              <p className="text-lg font-medium font-poppins">{card.to}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">Mensaje:</p>
              <p className="text-base whitespace-pre-wrap font-poppins">{card.message}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">Cantidad de reportes:</p>
              <p className="text-lg font-medium font-poppins text-red-500">{card.reportsCounter}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">Enviado:</p>
              <p className="text-base font-poppins">{new Date(card.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2 bg-transparent dark:text-gray-300 dark:hover:bg-slate-700"
            >
              Cancelar
            </Button>
            <Button 
              onClick={onRejectReports} 
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
            >
              <Ban size={16} />
              Mantener carta
            </Button>
            <Button
              onClick={onAcceptReports}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle size={16} />
              Eliminar carta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}