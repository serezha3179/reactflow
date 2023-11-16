import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // open: './index.html',
    open: './',
    port: 3003,
  },
  css: {
    devSourcemap: true, 
  },
})