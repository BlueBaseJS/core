import path from 'path';

function config(input: any) {
	input.resolve.alias['@bluebase/core'] = path.resolve(__dirname, '../../src');

	return input;
}

export default config;
