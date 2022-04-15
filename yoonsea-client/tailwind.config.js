module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme('colors'),
      color: '#1d68b7',
      black: '#03111d',
      gray1: '#8a939b',
      gray2: '#e6e8eb',
    }),
  },
  variants: {},
  plugins: [],
};
