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
          DEFAULT: '#FD7401',
          hover: '#994700',
        },
        // text '#994700',
        secondary: {
          DEFAULT: '#1E2772',
          light: '#F4F5FA',
        },

        third: '#555555',

        neutralLight: '#C2C2C2',
      },
      // Configuration de la police
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },

  plugins: [],
}