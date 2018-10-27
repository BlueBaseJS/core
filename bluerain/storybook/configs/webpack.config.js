const { storybookWebpackConfigs } = require('@blueeast/bluerain-cli-essentials');
const path = require('path');

module.exports = (baseConfig, env, config) => {
	
	config = storybookWebpackConfigs(baseConfig, env, config);
	
	config.resolve.alias['@bluebase/core$'] = path.resolve(__dirname, '../../../src');
	config.resolve.alias['@blueeast/bluerain$'] = path.resolve(__dirname, '../../../src');
	config.resolve.alias['@blueeast/bluerain-os$'] = path.resolve(__dirname, '../../../src');

	return config;
};
