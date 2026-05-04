/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ["Inter", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          golden: "#D4AF37",
          light: "#F4E7D0",
          dark: "#151512",
          accent: "#8A6A2F",
        },
      },
      boxShadow: {
        xl: "0 20px 25px -5px rgba(212,175,55,0.1), 0 10px 10px -5px rgba(212,175,55,0.04)",
      },
    },
  },
  plugins: [],
};