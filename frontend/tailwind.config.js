/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#2BC1AE',
      },
      fontFamily: {
        ibm: ['IBM Plex Sans Hebrew', 'sans-serif'],
        poppin: ['Poppins', 'sans-serif'],
      },
      screens: {
        ml: '950px',
      },
    },
  },
  plugins: [],
};
