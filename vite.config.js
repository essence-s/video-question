import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks')
    }
  },
  plugins: [react()],
  base: '/video-question/'
})
