/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--line-color)',
      },
    },
  },
  plugins: [],
  darkMode: ['selector', '.dark'],
  corePlugins: { preflight: false },
};
