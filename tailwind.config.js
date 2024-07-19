/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#323437',
        'text': '#d1d0c5',
        'text-inactive': '#646669',
        'primary': '#637AB7', // Updated to the new purple color
        'error': '#ca4754',
      },
    },
  },
  plugins: [],
}