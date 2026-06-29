/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        navy: '#14284d',
        orange: '#ee6b35',
        mist: '#f3f5f8',
      },
      boxShadow: {
        card: '0 18px 50px rgba(20, 40, 77, 0.08)',
      },
    },
  },
  plugins: [],
}
