const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (env, options) => merge(common(env, options), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 1234,
    open: false,
    hot: true,
  },
});
