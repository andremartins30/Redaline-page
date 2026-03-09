/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0b192c", // Deep navy blue (RedaLine base)
          green: "#00E676", // Neon green (RedaLine accent)
          blue: "#1D4ED8", // Royal blue (RedaLine buttons)
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
