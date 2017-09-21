const path = require('path');

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
	]
};

module.exports = config;
