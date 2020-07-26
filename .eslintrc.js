const configs = require('@bluebase/code-standards/.eslintrc');

module.exports = {
	...configs,
	env: {
		...configs.env,
		jest: true,
	},
	rules: {
		...configs.rules,
		'@typescript-eslint/no-inferrable-types': 0,
		'prefer-arrow/prefer-arrow-functions': 0,
		'react/jsx-no-bind': 0,
	},
};
