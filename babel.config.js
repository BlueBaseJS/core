module.exports = function(api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', '@bluebase/code-standards/babel.config'],
	};
};
