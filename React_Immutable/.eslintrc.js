module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
};