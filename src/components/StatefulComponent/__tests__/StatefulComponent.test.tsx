import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';

import { BlueBaseApp } from '../../../';
import { StatefulComponent } from '../StatefulComponent';
// import TestRenderer from 'react-test-renderer';

// jest.useFakeTimers();

describe('StatefulComponent', () => {
	test('should show empty state as no data is provided', async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent />
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		expect(
			component
				.find('StatefulComponent H6 Text')
				.last()
				.text()
		).toBe('No data');
		expect(
			component
				.find('StatefulComponent Body2 Text')
				.last()
				.text()
		).toBe('There is no data to display.');
	});

	test('should show empty state as data is an empty array', async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data={[]} />
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		// expect(component.find(StatefulComponent)).toMatchSnapshot();
		expect(
			component
				.find(StatefulComponent)
				.find('H6 Text')
				.last()
				.text()
		).toBe('No data');
		expect(
			component
				.find(StatefulComponent)
				.find('Body2 Text')
				.last()
				.text()
		).toBe('There is no data to display.');
	});

	test('should show loading state if loading is set to true', async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent loading delay={0} timeout={0} />
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		expect(component.exists('LoadingState')).toBe(true);
	});

	it('should show children nodes', async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data>
					<Text>Content</Text>
				</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		expect(
			component
				.find('StatefulComponent')
				.find('Text')
				.last()
				.text()
		).toBe('Content');
	});

	it('should show render prop children', async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data>{() => <Text>Render prop</Text>}</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		expect(
			component
				.find('StatefulComponent')
				.find('Text')
				.last()
				.text()
		).toBe('Render prop');
	});

	it('should show children from Component prop', async () => {
		const Comp = () => <Text>Custom Component</Text>;

		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data component={Comp}>
					<Text>Content</Text>
				</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		expect(
			component
				.find('StatefulComponent')
				.find('Text')
				.last()
				.text()
		).toBe('Custom Component');
	});
});
