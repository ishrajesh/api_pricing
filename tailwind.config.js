/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#13111C',
        surface: {
          DEFAULT: '#1A1825',
          dark: '#1E1B2E',
        },
        border: '#2D2B3B',
        primary: '#8B5CF6',
        'primary-hover': '#7C3AED',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '6xl': '3.5rem',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};