/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ade80', // Verde brilhante
          dark: '#22c55e',    // Verde mais escuro
          light: '#86efac',   // Verde mais claro
        },
        background: {
          DEFAULT: '#121212', // Preto/cinza escuro para fundo
          light: '#1e1e1e',   // Um pouco mais claro para elementos
          lighter: '#2d2d2d', // Ainda mais claro para cards e elementos destacados
        }
      },
    },
  },
  plugins: [],
}
