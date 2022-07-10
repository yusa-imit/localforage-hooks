module.exports = {
  extends: [
      'react-app',
      //"prettier/@typescript-eslint",
      //'plugin:prettier/recommended',
      'prettier',
  ],
  settings: {
      react: {
          version: 'detect',
      },
  },
  rules: {
    "import/no-webpack-loader-syntax": "off"
  }
};