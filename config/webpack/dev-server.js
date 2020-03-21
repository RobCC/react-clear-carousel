const chalk = require('chalk');
const logSymbols = require('log-symbols');

const { log } = console;

const { BUILD_PATH, ROOT_PATH } = require('./constants');

module.exports = {
  contentBase: BUILD_PATH,
  host: '0.0.0.0',
  port: 1234,
  open: false,
  overlay: false,
  hot: true,
  clientLogLevel: 'silent',
  // noInfo: true,
  historyApiFallback: true,
  stats: {
    all: undefined,
    assets: false,
    children: false,
    moduleTrace: false,
    chunk: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    context: ROOT_PATH,
    entrypoints: false,
    env: false,
    hash: false,
    modules: false,
    logging: 'warn',
    outputPath: false,
    publicPath: false,
    usedExports: false,
    version: false,
  },
  onListening: (server) => {
    const PORT = server.listeningApp.address().port;

    log(
      `\n${logSymbols.success}`,
      `${chalk.green.bold(`Running on ${process.env.NODE_ENV}`)}`,
    );
    log(
      logSymbols.info,
      chalk.cyan.bold('Listening on:'),
      `${chalk.cyan(`http://localhost:${PORT}`)}`,
    );
  },
};
