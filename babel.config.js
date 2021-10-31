module.exports = function(api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', '@bluebase/code-standards/babel.config'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						'@bluebase/core': './src',
					},
					extensions: [
						'.ios.js',
						'.android.js',
						'.js',
						'.jsx',
						'.json',
						'.tsx',
						'.ts',
						'.native.js',
					],
				},
			],
		],
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
