const Autoprefixer = require('autoprefixer');
const CssNano = require('cssnano');
const Stylelint = require('stylelint');

const { PROD } = require('./webpack/constants');

const env = process.env.NODE_ENV;

if (env === PROD) {
  module.exports = {
    plugins: [
      Autoprefixer,
      CssNano,
    ],
  };
} else {
  module.exports = {
    plugins: [
      Stylelint,
    ],
  };
}
