module.exports = {
  extends: ['react-app', 'prettier'],
  parserOptions: {
    babelOptions: {
      presets: [
        ['babel-preset-react-app', false],
        'babel-preset-react-app/prod'
      ]
    }
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 2,
    'prettier/prettier': 'error'
  }
};
