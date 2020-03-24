const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Sass = require('sass');
const path = require('path');

const PRODUCTION = 'production';

function cssLoaders(mode) {
  const loaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: true,
        localsConvention: 'camelCase',
        sourceMap: mode !== PRODUCTION,
        modules: {
          localIdentName: '[name]_[local]--[hash:base64:5]',
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: Sass,
      },
    },
  ];

  if (mode === PRODUCTION) {
    loaders.unshift({ loader: MiniCssExtractPlugin.loader });
  } else {
    loaders.unshift({ loader: 'style-loader' });
  }

  return loaders;
}

module.exports = (env, { mode }, extraPlugins = []) => ({
  context: path.resolve(__dirname, './'),
  entry: [
    path.resolve(__dirname, './src/index.tsx'),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    child_process: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: cssLoaders(mode),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '#': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
      react: path.resolve('./node_modules/react'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
    ...extraPlugins,
  ],
});
