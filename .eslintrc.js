module.exports = {
  parser: 'babel-eslint',
  // parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    // '@typescript-eslint'
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/require-default-props': 0,
  }
}
