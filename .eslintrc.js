/* eslint-disable max-len */
const configs = require('@bluebase/code-standards/.eslintrc');

module.exports = {
	...configs,
	env: {
		...configs.env,
		jest: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		...configs.rules,
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/no-inferrable-types': 0,
		'prefer-arrow/prefer-arrow-functions': 0,
		'react/jsx-no-bind': 0,

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
		'import/named': 0,
		'import/namespace': 0,
	},
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/typedef': 'off',
			},
		},
	],
};
