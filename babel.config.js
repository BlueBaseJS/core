module.exports = {
	presets: ['@bluebase/code-standards/babel.config'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					'@bluebase/core': './src',
				},
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
