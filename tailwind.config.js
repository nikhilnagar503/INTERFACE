/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: '#0B1220'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: []
}
