/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#001B3D", // Oceano profundo (base da marca)
          green: "#9EFF1F", // Verde vibrante (destaque)
          moss: "#457A00", // Verde musgo (secundario)
          blue: "#1D4ED8", // Azul mantido para CTAs
          light: "#F8FAFC", // Light surface background
          gray: "#334155", // Neutral text
        }
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 40px -10px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
