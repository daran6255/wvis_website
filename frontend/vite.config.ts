import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow access from external devices
    proxy: {
      '/api': 'http://127.0.0.1:5000', // backend runs locally, not via HTTPS here
    },
    allowedHosts: ['demo.winvinaya.com'], // allow requests from your domain
  },
})
