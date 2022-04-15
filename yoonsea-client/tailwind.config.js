module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme('colors'),
      color: '#1d68b7',
    }),
  },
  variants: {},
  plugins: [],
};
