/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        "lightest-grey": "#f9f9f9",
      },
    },
  },
  plugins: [],
};
