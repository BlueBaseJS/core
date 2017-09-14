const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

module.exports = new WebpackDevServer(compiler, webpackConfig.devServer);
