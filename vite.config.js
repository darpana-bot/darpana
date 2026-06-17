import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — proxy /api ke Express server di PORT 8787 saat development
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
