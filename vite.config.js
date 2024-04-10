import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Añade un alias para que puedas importar archivos Sass sin especificar la extensión.
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        // Habilita el soporte de sintaxis SCSS
        // (Si estás usando el sintaxis de Sass en lugar de SCSS, cambia 'scss' a 'sass')
        prependData: `@use '@/styles/variables' as *;`, // puedes agregar variables comunes aquí
      },
    },
  },
})
