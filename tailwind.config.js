/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16181d',
        navy: '#005a9f',
        orange: '#05b9e8',
        mist: '#f1f8fb',
      },
      boxShadow: {
        card: '0 18px 50px rgba(0, 90, 159, 0.1)',
      },
    },
  },
  plugins: [],
}
