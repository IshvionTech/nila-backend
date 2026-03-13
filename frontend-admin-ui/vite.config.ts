import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore - TypeScript might not recognize this package
 import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
     tailwindcss(),
  ],
  resolve: {
    dedupe: ["react", "react-dom"]
  },
  optimizeDeps: {
    include: ["react", "react-dom"]
  }
})