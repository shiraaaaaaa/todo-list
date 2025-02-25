import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    rollupOptions: {
      input: './dist/server/index.js',
    },
  },
  server: {
    proxy: {
        '/api': {
          target: 'http://localhost:3000',
          rewrite: (path) => path.replace('/api', ''),
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.log('proxy error', err);
            });
          },
        }
      }
  }
})
