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
import { Button } from './components/ui/Button'
import { PenTool } from 'lucide-react'
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
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-end items-center gap-3 mb-6">
            <Button
              onClick={handleGoToForm}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-4 py-2 text-sm font-poppins transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <PenTool size={16} />
              Enviar mensaje
            </Button>
            <ThemeToggle />
          </div>

          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 leading-tight tracking-wide font-playfair">
              No me atreví a decírtelo
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-lg font-light tracking-wide transition-colors duration-300 font-poppins">
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
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App