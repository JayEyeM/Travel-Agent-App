import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // this is the folder where Vite puts the build files
  },
  server: {
    proxy: {
      '/api':{
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});