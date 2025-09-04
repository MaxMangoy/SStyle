// VisteteYA-Frontend/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    historyApiFallback: true,
    allowedHosts: [
      '2ca616b63345.ngrok-free.app', // <--- Update this line with your current ngrok host
    ],
  }
})