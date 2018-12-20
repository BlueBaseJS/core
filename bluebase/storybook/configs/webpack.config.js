// const { storybookWebpackConfigs } = require('@blueeast/bluerain-cli-essentials');
const path = require('path');

module.exports = (baseConfig, env, config) => {
	
	// config = storybookWebpackConfigs(baseConfig, env, config);

	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		loader: require.resolve('awesome-typescript-loader')
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
