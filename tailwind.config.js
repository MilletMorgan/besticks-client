module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      1: '1px',
    },
    extend: {
      margin: {
        mt15: '1.5rem',
      },
      colors: {
        orange: '#cd5915',
        primary: '#63DAB1',
        secondary: '#037171',
        ternary: '#03312E',
      },
      height: {
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  variants: {
    extend: {
      tableLayout: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  corePlugins: {
  },
};
