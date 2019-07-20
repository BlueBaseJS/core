import { BlueBaseApp } from '../../../';
import { BlueBaseFilter } from '../BlueBaseFilter';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('BlueBaseFilter', () => {
	test(`should render a filtered value`, done => {
		const filters = {
			math: [
				{ key: 'add-fifteen', value: (val: number) => val + 15 },
				(val: number, { op }: { op: 'add' | 'subtract' } = { op: 'subtract' }) =>
					op === 'subtract' ? val - 5 : val + 5,
			],
		};

		const rendered: any = TestRenderer.create(
			<BlueBaseApp filters={filters}>
				<BlueBaseFilter filter="math" value={5} args={{ op: 'add' }}>
					{(val: number) => {
						return <Text>{val}</Text>;
					}}
				</BlueBaseFilter>
			</BlueBaseApp>
		);

		let text = rendered.root.findByType(Text);

		// expect(rendered.toJSON()).toMatchSnapshot();
		expect(text.instance.props.children).toBe('Loading');

		setTimeout(() => {
			// expect(rendered.toJSON()).toMatchSnapshot();

			text = rendered.root.findByType(Text);
			expect(text.instance.props.children).toBe(25);
			done();
		});
	});
});
