/**
 * Created by umair on 8/18/17.
 */
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
	entry: `${SRC_DIR}/app/index.js`,
	output: {
		path: `${DIST_DIR}/app`,
		filename: 'bundle.js',
		publicPath: '/app/'
	},
	module: {
		loaders: [
			{
				test: /\.js?/,
				include: SRC_DIR,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-2']
				}
			}, {
				test: /\.(css|scss)$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
		]
	}
};

module.exports = config;
