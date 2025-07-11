/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}"
  ],
  safelist: [
    'text-green-500',
    'text-red-500',
    'text-yellow-500',
    'text-blue-500',
    'text-orange-500',
    'text-teal-400'
  ],
  theme: {
    extend: {
      colors: {
        blue: "rgb(8, 112, 181)",
        green: "rgb(65, 230, 65)",
        purple: "rgb(79, 3, 79)",
        blueop: "rgb(50, 204, 160)",
        ash: "rgb(105,119,138)",
        navyblue: "rgb(15,23,42)",
        white: "#ffffff",
        sky: "rgb(72,138,247)",
        red: "#c81e23"
      },

    },
    extend: {},
  },
  plugins: [],
}

