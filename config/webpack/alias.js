const path = require('path');

const src = path.resolve(__dirname, '../../src');
const root = path.resolve(__dirname, '../..');

module.exports = {
  '#': src,
  '~': root,
};
