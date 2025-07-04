import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

export function SearchBar({ onSearch, isSearching, searchTerm }) {
  const [searchValue, setSearchValue] = useState(searchTerm || '')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      onSearch(searchValue.trim())
    }
  }

  const handleClear = () => {
    setSearchValue('')
    onSearch('')
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    // Si el input está vacío, limpiar la búsqueda automáticamente
    if (e.target.value === '') {
      onSearch('')
    }
  }

  return (
    <div className="mb-10">
      <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
        <div className="relative">
          <Input
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Buscar mensajes por destinatario..."
            className="pl-10 pr-24 h-12 text-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 font-poppins"
            disabled={isSearching}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-300"
            size={20}
          />
          
          {/* Botones de acción */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            {searchValue && (
              <Button
                type="button"
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-slate-700"
                disabled={isSearching}
              >
                <X size={16} />
              </Button>
            )}
            
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              disabled={isSearching || !searchValue.trim()}
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </div>
        
        {/* Indicador de búsqueda activa */}
        {searchTerm && (
          <div className="mt-2 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
              Mostrando resultados para: "{searchTerm}"
              <button
                onClick={handleClear}
                className="ml-2 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-1"
              >
                <X size={14} />
              </button>
            </span>
          </div>
        )}
      </form>
    </div>
  )
}