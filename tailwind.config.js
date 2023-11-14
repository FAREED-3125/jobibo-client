/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        mont: "Montserrat",
      },
      width: {
        "20%": "20%",
      },
    },
  },
  plugins: [],
};
