import React from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/Input'

export function SearchBar() {
  return (
    <div className="mb-10">
      <div className="relative max-w-xl mx-auto">
        <Input
          placeholder="Buscar mensajes..."
          className="pl-10 h-12 text-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 font-poppins"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-300"
          size={20}
        />
      </div>
    </div>
  )
}