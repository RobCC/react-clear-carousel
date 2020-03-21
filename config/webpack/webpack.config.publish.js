const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EsLintFormatter = require('eslint-formatter-pretty');
const path = require('path');

const pkg = require('../../package.json');
const { SRC_PATH, BUILD_PATH } = require('./constants');
const setStyleLoaders = require('./style-loaders');
const alias = require('./alias');

const packageName = pkg.name;

module.exports = ({ NODE_ENV }) => ({
  mode: 'production',
  entry: `${SRC_PATH}/components/Carousel/Carousel.js`,
  output: {
    path: BUILD_PATH,
    filename: 'index.js',
    library: packageName,
    libraryTarget: 'commonjs2',
    umdNamedDefine: true,
    publicPath: '/build/',
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  resolve: {
    alias: {
      ...alias,
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  externals: {
    react: 'react',
    reactDom: 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              formatter: EsLintFormatter,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: setStyleLoaders(NODE_ENV),
      },
      {
        test: /\.(png|pje?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|tff|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
  ],
});
