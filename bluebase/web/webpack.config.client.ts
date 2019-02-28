import path from 'path';

export default function (input: any) {

	input.resolve.alias['@bluebase/core'] = path.resolve(__dirname, '../../src');

	return input;
}