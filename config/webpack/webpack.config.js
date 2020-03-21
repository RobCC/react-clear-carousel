const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const StyleLintFormatter = require('stylelint-formatter-pretty');
const EsLintFormatter = require('eslint-formatter-pretty');

const {
  DEV, ROOT_PATH, SRC_PATH, BUILD_PATH,
} = require('./constants');
const setStyleLoaders = require('./style-loaders');
const devServer = require('./dev-server');
const alias = require('./alias');

module.exports = ({ NODE_ENV }) => ({
  devServer,
  mode: NODE_ENV,
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    `${SRC_PATH}/index.js`,
  ],
  devtool: NODE_ENV === DEV ? 'eval-source-map' : false,
  context: ROOT_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
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
    new StyleLintPlugin({
      formatter: StyleLintFormatter,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
  ],
});
