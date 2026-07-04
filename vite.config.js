import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path for GitHub Pages (must match repo name exactly)
  base: '/Babynest/',

  build: {
    // Increase warning threshold — acceptable for a full-featured SPA
    chunkSizeWarningLimit: 800,
  },
})
