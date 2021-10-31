module.exports = function(api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', '@bluebase/code-standards/babel.config'],
		env: {
			test: {
				plugins: [
					[
						'istanbul',
						{
							exclude: ['**/*.test.{ts,tsx,js,jsx}', 'tests/*.{ts,tsx,js,jsx}'],
						},
					],
				],
			},
		},
	};
};
