/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
theme: {
  extend: {
    colors: {
      gold: "#C6A75E",
      cream: "#F5F2EB",
      darkBg: "#0E0E0E",
    },
    fontFamily: {
      serif: ["Playfair Display", "serif"],
      sans: ["Inter", "sans-serif"],
    },
  },
},
  plugins: [],
}
