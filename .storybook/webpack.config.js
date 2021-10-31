const { resolve } = require("path");
const { withUnimodules } = require("@expo/webpack-config/addons");

module.exports = ({ config }) => {
  const newConfig = withUnimodules(config, { projectRoot: resolve(__dirname, "../") });
	newConfig.resolve.alias['@bluebase/core'] = resolve(__dirname, '../src');
	return newConfig;
};
