import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'frontend-production-87d1.up.railway.app',
      'nomeatrevi.com',
      'www.nomeatrevi.com',
      'https://nomeatrevi.com',
      'https://www.nomeatrevi.com'
    ]
  }
})