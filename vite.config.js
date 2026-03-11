import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/mobicompro",
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://exercise.mobicom-pro.com',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // }
})