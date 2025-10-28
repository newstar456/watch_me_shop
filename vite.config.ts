import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/watch_me_shop/', 
})
