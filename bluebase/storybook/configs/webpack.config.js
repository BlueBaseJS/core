const { withUnimodules } = require('@expo/webpack-config/addons');
const { resolve } = require('path');

module.exports = ({ config }) => {
	const newConfig = withUnimodules(
		config,
		{
			projectRoot: resolve(__dirname, '../../../'),
		},
		{
			supportsFontLoading: false,
		}
	);

	newConfig.resolve.alias['@bluebase/core'] = resolve(__dirname, '../../../src');

	return newConfig;
};
