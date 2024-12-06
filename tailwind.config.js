/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6E01',
          50: '#FFF1E6',
          100: '#FFE4CC',
          200: '#FFD1A3',
          300: '#FFBD7A',
          400: '#FFA952',
          500: '#FF6E01',
          600: '#CC5800',
          700: '#994200',
          800: '#662C00',
          900: '#331600',
        },
        secondary: {
          DEFAULT: '#400C7A',
          50: '#F3E6FF',
          100: '#E6CCFF',
          200: '#CC99FF',
          300: '#B366FF',
          400: '#9933FF',
          500: '#400C7A',
          600: '#330962',
          700: '#260749',
          800: '#190431',
          900: '#0D0218',
        },
      },
    },
  },
  plugins: [],
};