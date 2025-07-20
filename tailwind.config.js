/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '360px',
        xs2: '430px',
        llg: '1120px',
        'l-md': '525px',
        xl3: '1860px', //3xl
      },
      fontSize: {
        h1: ['40px', { fontWeight: '700' }],
        h2: ['32px', { fontWeight: '600' }],
        h3: ['24px', { fontWeight: '600' }],
        h4: ['20px', { fontWeight: '600' }],
        h5: ['16px', { fontWeight: '500' }],
        h6: ['14px', { fontWeight: '500' }],
        body: ['16px', { fontWeight: '400' }],
        p: ['16px', { fontWeight: '400' }],
        caption: ['12px', { fontWeight: '400' }],
        link: ['16px', { fontWeight: '400' }],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        customColor: '#8800ff',
        customPurple: '#5D3FD3',
        customPurpleLight: '#AFA1E7',
      },

      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
    fontFamily: {
      poppins: ['Poppins'],
      qurova: ['Qurova', 'sans-serif'],
      futuru: ['Futuru', 'sans-serif'],
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/typography'),
  ],
};
