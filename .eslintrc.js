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
	},
};
