/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'modal': 'rgba(73, 166, 233, 0.5)',
      },
      width:{
        '90': '90vw'
      },
      height:{
        '30': '30vh'
      },
      maxWidth:{
        '11/12': '91.666667%',
        
      }
    },
  },
  plugins: [],
}
