/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        literary: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        parchment: {
          DEFAULT: '#faf5ed',
          50: '#fdfbf7',
          100: '#faf5ed',
          200: '#f4ece1',
          300: '#ebdcc5',
          400: '#dec5a3',
          500: '#cca87b',
        },
        terracotta: {
          DEFAULT: '#8b2e23',
          50: '#fbf4f3',
          100: '#f6e5e3',
          500: '#a33a2e',
          600: '#8b2e23',
          700: '#732219',
          800: '#5a1912',
          900: '#3e100b',
        },
        chai: {
          DEFAULT: '#d49a3d',
          100: '#fbf3e4',
          200: '#f6e4c2',
          400: '#e5b259',
          500: '#d49a3d',
          600: '#b87e27',
        },
        forest: {
          DEFAULT: '#1c382b',
          700: '#234737',
          800: '#1c382b',
          900: '#14291f',
        },
        wood: {
          DEFAULT: '#2a1710',
          50: '#faf6f4',
          100: '#f3eae6',
          700: '#46281e',
          800: '#341c14',
          900: '#24130d',
        },
      },
    },
  },
  plugins: [],
};

