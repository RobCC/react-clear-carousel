const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (env, options) => merge(common(env, options, [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
]), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 1234,
    open: false,
    hot: true,
  },
});
