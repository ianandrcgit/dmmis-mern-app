/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
            brand: '#007bff', // Match your current blue
        }
    },
  },
  plugins: [],
}