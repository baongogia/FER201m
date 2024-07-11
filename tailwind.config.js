/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main:'#ccf381',
        hover: '#8db8bd'
      }
    },
  },
  plugins: [],
}