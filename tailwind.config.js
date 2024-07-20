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
        'primary': 'var(--primary-color, #637AB7)', // Use CSS variable for primary color
        'error': '#ca4754',
      },
    },
  },
  plugins: [],
}