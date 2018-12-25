import { BlueBaseApp } from '../../BlueBaseApp';
import { BlueBaseHook } from '../BlueBaseHook';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('BlueBaseHook', () => {

	test(`should render a hooked value`, (done) => {

		const hooks = {
			math: [
				{ key: 'add-fifteen', value: (val: number) => val + 15 },
				(val: number, { op }: { op: 'add' | 'subtract' } = { op: 'subtract' }) => (op === 'subtract' ? val - 5 : val + 5)
			],
		};

		const rendered: any = TestRenderer.create(
			<BlueBaseApp hooks={hooks}>
				<BlueBaseHook hook="math" value={5} args={{ op: 'add' }} children={(val: number) => {
					return <Text>{val}</Text>;
				}} />
			</BlueBaseApp>
		);

		expect(rendered.toJSON().children.join()).toBe('Loading');
		expect(rendered.toJSON()).toMatchSnapshot();

		setTimeout(() => {
			const text = rendered.root.findByType(Text);
			expect(text.children[0].children.join()).toBe('25');
			expect(rendered.toJSON()).toMatchSnapshot();
			done();
		});
	});

});
