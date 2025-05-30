import React from 'react'
import { ThemeProvider } from './components/ThemeProvider'
import { ThemeToggle } from './components/ThemeToggle'
import { SearchBar } from './components/SearchBar'
import { MessageBoard } from './components/MessageBoard'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header with theme toggle */}
          <div className="flex justify-end mb-6">
            <ThemeToggle />
          </div>

          {/* Title Section */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 leading-tight tracking-wide font-playfair">
              No me atreví a decírtelo
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-lg font-light tracking-wide transition-colors duration-300 font-poppins">
              Mensajes que guardamos en silencio, ahora compartidos anónimamente
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Message Board */}
          <MessageBoard />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App