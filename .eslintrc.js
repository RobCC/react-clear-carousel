const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    'browser': true,
    'jest': true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['#', path.resolve(path.join(__dirname, './src'))],
          ['~', path.resolve(path.join(__dirname, '.'))],
        ],
        extensions: ['.js'],
      },
    },
  },
  rules: {
    'max-len': ['error', { 'code': 90, 'tabWidth': 2, 'comments': 80 }],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    'import/no-named-as-default': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-unused-vars': 'warn',
    'linebreak-style': 0,
  },
};
