// const { storybookWebpackConfigs } = require('@blueeast/bluerain-cli-essentials');
const path = require('path');
// const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (baseConfig, env, config) => {
	
	// config = storybookWebpackConfigs(baseConfig, env, config);

	config.module.rules.push({
		
		test: /\.(ts|tsx)$/,
    include: [
			path.resolve(__dirname, '../../../src'),
			path.resolve(__dirname, '../../../bluebase')
		],
		use: [
			{
				loader: require.resolve('ts-loader'),
			},
			// require.resolve('react-docgen-typescript-loader'),
		],
	});
	config.resolve.extensions.push(".ts", ".tsx");

	// Alias react-native
	config.resolve.alias['react-native$'] = require.resolve('react-native-web');
	config.resolve.alias['react-art$'] = require.resolve('react-art');

	// Alias legacy projects
	config.resolve.alias['@bluebase/core$'] = path.resolve(__dirname, '../../../src');
	config.resolve.alias['@blueeast/bluerain$'] = path.resolve(__dirname, '../../../src');
	config.resolve.alias['@blueeast/bluerain-os$'] = path.resolve(__dirname, '../../../src');

	return config;
};
