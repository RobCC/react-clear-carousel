const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  // parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:import/typescript',
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
  settings: {
    'import/resolver': '{
      webpack: {
        config: 'webpack.common.js',
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/require-default-props': 0,
    'import/extensions': ['error', 'ignorePackages', {
      'js': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': [
        '**/webpack.*.js',
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
    }],
  },
}
