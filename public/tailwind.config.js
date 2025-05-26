/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,js}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "var(--color-primary)",
        "color-primary-light": "var(--color-primary-light)",
        "color-gray-light": "var(--color-gray-light)",
        "color-gray-light-2": "var(--color-gray-light-2)",
        "color-bg": "var(--color-bg)",
      },
    },
  },
  plugins: [],
};
