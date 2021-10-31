import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';

import { BlueBaseApp } from '../../../';
import { BlueBaseFilter } from '../BlueBaseFilter';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('BlueBaseFilter', () => {
	test('should render a filtered value', async () => {
		const filters = {
			math: [
				{ key: 'add-fifteen', value: (val: number) => val + 15 },
				(val: number, { op }: { op: 'add' | 'subtract' } = { op: 'subtract' }) =>
					op === 'subtract' ? val - 5 : val + 5,
			],
		};

		const wrapper = mount(
			<BlueBaseApp filters={filters}>
				<BlueBaseFilter filter="math" value={5} args={{ op: 'add' }}>
					{(val: number) => {
						return <Text testID="val">{val}</Text>;
					}}
				</BlueBaseFilter>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Text[testID="val"]');

		expect(
			wrapper
				.find('Text[testID="val"]')
				.last()
				.text()
		).toBe('25');
	});

	test('should show error state when a filter throws', async () => {
		const filters = {
			math: [
				{ key: 'add-fifteen', value: (val: number) => val + 15 },
				() => {
					throw new Error();
				},
			],
		};

		const wrapper = mount(
			<BlueBaseApp filters={filters}>
				<BlueBaseFilter filter="math" value={5} args={{ op: 'add' }}>
					{(val: number) => {
						return <Text testID="val">{val}</Text>;
					}}
				</BlueBaseFilter>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ErrorState');

		expect(wrapper.find('ErrorState').exists()).toBe(true);
	});
});
