module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['react-app', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
};
