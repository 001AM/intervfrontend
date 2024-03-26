/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      fredoka: ["Fredoka"]
    },
    extend: {
      colors: {
        black: '#020202',
        main: '#050D22',
        darkBackground: '#464646',
        lightBackground: '#FAF9F6',
        primaryText: '#ffffff',
        secondaryText: '#cccccc',
        mainAccent1: '#031022',
        mainAccent2: '#0D2205',
        inputBg1: '#e5e5e5',
        buttonBg1: '#015eb4'
      },
    },
  },
  plugins: [],
}