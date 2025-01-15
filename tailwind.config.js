/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './pages/**/*.html'
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        dark: '#0f172a', //hex warna
      },
      screens: {
        '2xl': '1320px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

