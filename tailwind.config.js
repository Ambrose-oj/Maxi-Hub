/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: '#FDFBF7', // Oat Milk
        ink: '#333333',    // Charcoal Silk
        accent: '#E68A5C', // Burnt Apricot
        soft: '#BFA6C4',   // Dusty Lilac
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/path-to-your-lifestyle-image.jpg')",
      }
    },
  },
  plugins: [],
}