/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warm: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8decb',
          300: '#d6c6a6',
          400: '#bda67b',
          500: '#a38758',
          600: '#8c6f44',
          700: '#715636',
          800: '#5c452e',
          900: '#4c3927',
          950: '#2a1e14',
        },
        prayer: {
          blue: '#1d4ed8',
          gold: '#d97706',
          red: '#dc2626',
          white: '#f8fafc',
          green: '#15803d'
        }
      },
      minHeight: {
        'touch': '48px',
        'touch-lg': '64px',
        'touch-xl': '80px',
      },
      minWidth: {
        'touch': '48px',
        'touch-lg': '64px',
        'touch-xl': '80px',
      }
    },
  },
  plugins: [],
}
