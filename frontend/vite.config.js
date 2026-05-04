// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // If you call the full URL in api.js, you can remove the server.proxy section 
  // unless you specifically need it for local dev CORS bypass.
})