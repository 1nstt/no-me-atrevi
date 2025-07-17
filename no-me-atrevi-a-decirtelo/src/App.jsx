import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { AuthProvider } from './components/context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ThemeToggle } from './components/ThemeToggle'
import { SearchBar } from './components/SearchBar'
import { MessageBoard } from './components/MessageBoard'
import { MessageForm } from './components/MessageForm'
import { LoginForm } from './components/LoginForm'
import { ReportedCardsDashboard } from './components/ReportedCardsDashboard'
import { AboutPage } from './components/AboutPage'
import { DonationsPage } from './components/DonationsPage'
import { CommunityRulesPage } from './components/CommunityRulesPage'
import { Button } from './components/ui/Button'
import { PenTool, Info, Heart, Shield } from 'lucide-react'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleGoToForm = () => {
    setCurrentView('form')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  const handleMessageSubmit = (newMessage) => {
    console.log('Nuevo mensaje enviado:', newMessage)
    setSearchTerm('')
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  // Componente para la página principal
  const HomePage = () => {
    if (currentView === 'form') {
      return (
        <MessageForm 
          onBack={handleBackToHome}
          onSubmit={handleMessageSubmit}
        />
      )
    }

    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-4 sm:py-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header con botones - Mobile responsive */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
            {/* Botones izquierda - Stack en móvil, inline en desktop */}
            <div className="flex flex-wrap gap-2 sm:gap-2">
              <Button
                onClick={() => window.location.href = '/donations'}
                className="flex items-center gap-2 text-xs sm:text-sm bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium shadow-md hover:shadow-lg font-poppins py-2 px-3 rounded-lg transition-all duration-300"
              >
                <Heart size={14} />
                <span className="hidden sm:inline">Donaciones</span>
                <span className="sm:hidden">Donar</span>
              </Button>
              <Button
                onClick={() => window.location.href = '/about'}
                variant="ghost"
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-poppins py-2 px-3 transition-all duration-200"
              >
                <Info size={14} />
                <span className="hidden sm:inline">Acerca de</span>
                <span className="sm:hidden">Info</span>
              </Button>
              <Button
                onClick={() => window.location.href = '/community-rules'}
                variant="ghost"
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-poppins py-2 px-3 transition-all duration-200"
              >
                <Shield size={14} />
                <span className="hidden sm:inline">Normas</span>
                <span className="sm:hidden">Reglas</span>
              </Button>
            </div>

            {/* Botones derecha */}
            <div className="flex items-center gap-3 sm:ml-auto">
              <Button
                onClick={handleGoToForm}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-4 sm:px-6 py-2.5 text-sm font-poppins transition-all duration-300 shadow-md hover:shadow-lg rounded-lg"
              >
                <PenTool size={16} />
                <span className="hidden sm:inline">Enviar mensaje</span>
                <span className="sm:hidden">Enviar</span>
              </Button>
              <ThemeToggle />
            </div>
          </div>

          <div className="mb-8 sm:mb-12 text-center px-2">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 leading-tight tracking-wide font-playfair">
              No me atreví a decírtelo
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg font-light tracking-wide transition-colors duration-300 font-poppins">
              Mensajes que guardamos en silencio, ahora en un mural en el que al menos no morirán en el fondo de un recuerdo.
            </p>
          </div>

          <SearchBar 
            onSearch={handleSearch}
            isSearching={isSearching}
            searchTerm={searchTerm}
          />

          <MessageBoard 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>
    )
  }

  // Componente para el dashboard de reportes (protegido)
  const ReportsPage = () => {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-end items-center gap-3 mb-6 pt-8">
              <ThemeToggle />
            </div>
            <ReportedCardsDashboard 
              onBack={() => window.history.back()}
            />
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vixonpaleta" element={<LoginForm />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donations" element={<DonationsPage />} />
          <Route path="/community-rules" element={<CommunityRulesPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App