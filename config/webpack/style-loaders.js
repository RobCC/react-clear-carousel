const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Sass = require('sass');

const { DEV, PROD, CONFIG_PATH } = require('./constants');

module.exports = (NODE_ENV) => {
  const stylingLoaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: true,
        localsConvention: 'camelCase',
        sourceMap: NODE_ENV === DEV,
        modules: {
          localIdentName: NODE_ENV === PROD
            ? '[name]_[local]--[hash:base64:5]'
            : '[name]_[local]--[hash:base64:2]',
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: { path: `${CONFIG_PATH}/postcss.config.js` },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: Sass,
      },
    },
  ];

  if (NODE_ENV === PROD) {
    stylingLoaders.unshift({ loader: MiniCssExtractPlugin.loader });
  } else {
    stylingLoaders.unshift({ loader: 'style-loader' });
  }

  return stylingLoaders;
};
