/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',             // Escanea el archivo HTML raíz
    './src/**/*.{js,jsx,ts,tsx}', // Escanea todos los archivos dentro de 'src' con las extensiones .js, .jsx, .ts, y .tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

