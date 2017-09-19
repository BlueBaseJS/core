const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: `${__dirname}/dist`
	},

  // Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		extensions: ['.webpack.js', '.web.js', '.js'],
		alias: {
      'react': path.resolve(path.join(__dirname, 'node_modules', 'react')),
      'react-dom': path.resolve(path.join(__dirname, 'node_modules', 'react-dom')),
      'reactxp': path.resolve(path.join(__dirname, 'node_modules', 'reactxp')),
    },
	},

	module: {
		loaders: []
	},

	plugins: [
		new BundleAnalyzerPlugin(),
	]
};

module.exports = config;
