/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "f-red": "#ff0054",
        "f-orange": "#f26430",
        "f-blue": "#30a2ff",
      },
    },
  },
  plugins: [],
};
