// tslint:disable: object-literal-sort-keys
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';

import { BlueBaseApp } from '../../../';
import { EmptyState } from '../../EmptyState';
import { Navigation } from '../Navigation';

function SomeComponent() {
	return <Text>SomeComponent</Text>;
}

describe('Navigation', () => {
	test('should render a screen component', async () => {
		const navigator = {
			type: 'stack',
			routes: [
				{
					name: 'Home',
					path: '',
					screen: SomeComponent,
				},
			],
		};

		const component = mount(
			<BlueBaseApp>
				<Navigation navigator={navigator} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, SomeComponent);

		expect(component.exists('Navigation SomeComponent')).toBe(true);
	});

	test('should render a screen component from component registry', async () => {
		const navigator = {
			type: 'stack',
			routes: [
				{
					name: 'Home',
					path: '',
					screen: 'EmptyState',
				},
			],
		};

		const component = mount(
			<BlueBaseApp>
				<Navigation navigator={navigator} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, EmptyState);

		expect(component.exists('Navigation EmptyState')).toBe(true);
	});

	test('should render a screen component in a nested navigator', async () => {
		const navigator = {
			type: 'stack',
			routes: [
				{
					name: 'Home',
					path: '',
					navigator: {
						type: 'stack',
						routes: [
							{
								name: 'Nested',
								path: '',
								screen: SomeComponent,
							},
						],
					},
				},
			],
		};

		const component = mount(
			<BlueBaseApp>
				<Navigation navigator={navigator} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, SomeComponent);

		expect(component.exists('Navigation SomeComponent')).toBe(true);
	});

	test('should render null if theres no screen or navigator prop in route', async () => {
		const navigator = {
			type: 'stack',
			routes: [
				{
					name: 'Home',
					path: '',
				},
			],
		};

		const component = mount(
			<BlueBaseApp>
				<Navigation navigator={navigator} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, Navigation);

		expect(component.find('Navigation').children()).toHaveLength(0);
	});

	test('should render null if theres no route', async () => {
		const navigator = {
			type: 'stack',
		} as any;

		const component = mount(
			<BlueBaseApp>
				<Navigation navigator={navigator} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, Navigation);

		expect(component.find('Navigation').children()).toHaveLength(0);
	});
});
