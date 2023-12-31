/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        side: "#060606",
        header: "#423C3F",
      },
      textColor: {
        side: "#8b8d93",
      },
    },
  },
  plugins: [],
};
