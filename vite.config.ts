import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true, 
    outDir: 'build',
    rollupOptions: {
      input: './app/main.jsx', // Our React entrypoint
    },
  },
  server: {
    port: 4000, 
  },
})
