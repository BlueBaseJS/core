const path = require('path');
const webpack = require('webpack');

const PORT = 8080;

module.exports = {
	entry: {
		app: [
			'react-hot-loader/patch',
			`webpack-dev-server/client?http://localhost:${PORT}/`,
			'webpack/hot/dev-server',
			path.join(__dirname, './src/index.js')
		]
	},

	output: {
		path: path.join(__dirname, './public/built'),
		filename: 'bundle.js',
		publicPath: `http://localhost:${PORT}/built/`
	},

	devServer: {
		contentBase: './public',
		publicPath: `http://localhost:${PORT}/built/`,
		historyApiFallback: true,
		// hot: true,
		// stats: 'errors-only',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		extensions: ['.webpack.js', '.electron.js', 'web.js', '.js']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.IgnorePlugin(new RegExp('^(fs|ipc)$'))
	]
};
