/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#6B21A8',
          50: '#F3E8FF',
          100: '#E6CCFF',
          200: '#CC99FF',
          300: '#B366FF',
          400: '#9933FF',
          500: '#6B21A8',
          600: '#330962',
          700: '#260749',
          800: '#190431',
          900: '#0D0218',
        },
        primary: {
          DEFAULT: '#FF6E01',
          50: '#FFF7E6',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFAE66',
          400: '#FF9333',
          500: '#FF6E01',
          600: '#CC5800',
          700: '#994200',
          800: '#662C00',
          900: '#331600',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#C53A24',
        neutral: {
          100: '#F6F6F6',
          200: '#FFFFFF',
          300: '#E5E5E5',
        },
        brand: {
          DEFAULT: '#400C7A',
          orange: '#FF6E01',
          purple: {
            light: '#E7D1FF',
            DEFAULT: '#9003DE',
            dark: '#400C7A',
            darker: '#400C7A',
          },
          400: '#9003DE',
          500: '#400C7A',
          600: '#330A62',
          700: '#260749',
          800: '#190431',
          900: '#0D0218',
          50: '#F3E8FF',
        },
        stroke: {
          light: '#FFFFFF',
          dark: '#400C7A',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '3xs': '12px',
        '2xs': '14px',
        xs: '16px',
        sm: '18px',
        base: '20px',
        lg: '24px',
        xl: '28px',
        '2xl': '32px',
        '3xl': '36px',
        '4xl': '42px',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      backgroundImage: {
        'gradient-purple':
          'linear-gradient(180deg, rgba(64, 12, 122, 0.2) 0%, rgba(255, 255, 255, 0.8) 100%)',
        'gradient-purple-dark':
          'linear-gradient(180deg, #7616E0 0%, #400C7A 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
