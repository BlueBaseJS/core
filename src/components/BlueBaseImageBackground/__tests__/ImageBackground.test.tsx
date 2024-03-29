import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';

import { BlueBaseApp } from '../../../';
import { BlueBaseImageBackground } from '../BlueBaseImageBackground';

describe('ImageBackground', () => {
	it('should render a BlueBlueImage', async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImageBackground source="Logo" style={{ width: 100 }}>
					<Text>Foo</Text>
				</BlueBaseImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImageBackground);

		expect(
			wrapper
				.find('ImageBackground')
				.last()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it('should render a BlueBlueImage', async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImageBackground source="Logo" style={{ width: 100 }}>
					<Text>Foo</Text>
				</BlueBaseImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImageBackground);

		expect(
			wrapper
				.find('Image')
				.first()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it('should render a backup BlueBlueImage', async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImageBackground source={['Icon', 'Logo']} style={{ width: 100 }}>
					<Text>Foo</Text>
				</BlueBaseImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImageBackground);

		expect(
			wrapper
				.find('Image')
				.first()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it('should render a backup BlueBlueImage from source prop', async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImageBackground source={['Icon', 'Logo']} style={{ width: 100 }}>
					<Text>Foo</Text>
				</BlueBaseImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImageBackground);

		expect(
			wrapper
				.find('Image')
				.first()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it('should render just children if there is not source prop', async () => {
		const CustomBlueBaseImageBackground: any = BlueBaseImageBackground;

		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<CustomBlueBaseImageBackground>
					<Text>Foo</Text>
				</CustomBlueBaseImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, CustomBlueBaseImageBackground);

		expect(wrapper.find('Image').exists()).toBe(false);
		expect(
			wrapper
				.find('Text')
				.last()
				.text()
		).toBe('Foo');
	});
});
