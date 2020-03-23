const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const pkg = require('./package.json');

module.exports = (env, options) => merge(common(env, options), {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: pkg.name,
    libraryTarget: 'commonjs2',
    umdNamedDefine: true,
    publicPath: '/dist/',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
});
