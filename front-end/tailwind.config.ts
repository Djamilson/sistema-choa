import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#666666',
        secondary: '#666666',
        orangermy: '#e9a42e',
        accent: {
          DEFAULT: '#ed1d24',
          hover: '#dd242a',
          secondary: '#F15383',
        },
        success_two: {
          DEFAULT: '#1d9448',
          hover: '#0e6e32',
        },
        success: {
          DEFAULT: '#1a7f64',
          hover: '#2abf8e;',
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#D1FADF',
          600: '#039855',
          700: '#027A48',
          900: '#054F31',
        },
        blue: {
          25: '#F5FAFF',
          100: '#D1E9FF',
          500: '#2E90FA',
          600: '#1570EF',
          700: '#175CD3',
          900: '#194185',
        },
        pink: {
          25: '#FEF6FB',
          100: '#FCE7F6',
          500: '#EE46BC',
          600: '#DD2590',
          700: '#C11574',
          900: '#851651',
        },
        body: '#dedede',
        google: {
          'text-gray': '#3c4043',
          'button-blue': '#1a73e8',
          'button-blue-hover': '#5195ee',
          'button-dark': '#202124',
          'button-dark-hover': '#555658',
          'button-border-light': '#dadce0',
          'logo-blue': '#4285f4',
          'logo-green': '#34a853',
          'logo-yellow': '#fbbc05',
          'logo-red': '#ea4335',
        },
      },
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  extend: {
    keyframes: {},
    animation: {},
  },
  plugins: [],

  fontFamily: {
    inter: 'var(--font-inter)',
    'ibm-plex-serif': 'var(--font-ibm-plex-serif)',
  },

  keyframes: {
    slideDownAndFade: {
      from: { opacity: 0, transform: 'translateY(-2px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
  },
  animation: {
    slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
}
export default config
