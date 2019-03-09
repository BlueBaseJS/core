const { storybookWebpackConfigs } = require('@bluebase/cli-essentials');
// const path = require('path');
// const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = ({ config }) => {
	
	config = storybookWebpackConfigs({ config });

	// config.module.rules.push({
		
	// 	test: /\.(ts|tsx)$/,
  //   include: [
	// 		path.resolve(__dirname, '../../../bluebase'),
	// 		path.resolve(__dirname, '../../../src/index'),
	// 	],
	// 	use: [
	// 		{
	// 			loader: require.resolve('ts-loader'),
	// 		},
	// 		// require.resolve('react-docgen-typescript-loader'),
	// 	],
	// });
	// config.resolve.extensions.push(".ts", ".tsx");

	// // Alias react-native
	// config.resolve.alias['react-native$'] = require.resolve('react-native-web');
	// config.resolve.alias['react-art$'] = require.resolve('react-art');
	
	// // Alias legacy projects
	// config.resolve.alias['@bluebase/core$'] = path.resolve(__dirname, '../../../src');
	// config.resolve.alias['@blueeast/bluerain$'] = path.resolve(__dirname, '../../../src');
	// config.resolve.alias['@blueeast/bluerain-os$'] = path.resolve(__dirname, '../../../src');
	console.log(config)

	return config;
};
