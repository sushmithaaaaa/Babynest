/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
      colors: {
        babyPink: {
          light: '#FFF5F7',
          DEFAULT: '#FF94B4',
          dark: '#E84E7B',
        },
        babyBlue: {
          light: '#F0F9FF',
          DEFAULT: '#7DD3FC',
          dark: '#0284C7',
        },
        babyMint: {
          light: '#F0FDF4',
          DEFAULT: '#86EFAC',
          dark: '#16A34A',
        },
        babyPeach: {
          light: '#FFF7ED',
          DEFAULT: '#FDBA74',
          dark: '#EA580C',
        },
        babyPurple: {
          light: '#FAF5FF',
          DEFAULT: '#D8B4FE',
          dark: '#9333EA',
        },
        babyYellow: {
          light: '#FEFCE8',
          DEFAULT: '#FDE047',
          dark: '#CA8A04',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
