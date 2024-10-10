/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--line-color)',
      },
      keyframes: {
        moveToCenter: {
          '0%': {
            position: 'absolute', // Coloca o elemento como absoluto no início
          },
          '50%': {
            position: 'absolute', // Mantém a posição absoluta no meio da animação
          },
          '100%': {
            position: 'absolute', // Continua como absoluto no final da animação
          },
        },
      },
      animation: {
        moveCenter: 'moveToCenter 1s ease-in-out forwards',
      },
      minHeight: {
        min80: '80dvh', // Exemplo de 50% da altura da tela
      },
    },
  },
  plugins: [],
  darkMode: ['selector', '.dark'],
  corePlugins: { preflight: false },
};
