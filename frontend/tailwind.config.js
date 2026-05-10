/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#F9A825',
          'yellow-dark': '#F57C00',
          red: '#D32F2F',
          'red-light': '#EF5350',
          cream: '#FFFDE7',
          'cream-light': '#FFF9E7',
        }
      }
    },
  },
  plugins: [],
}
