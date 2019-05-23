import { BlueBaseApp } from '../../../components/BlueBaseApp';
import { ImageBackground } from '../ImageBackground';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ImageBackground', () => {
	it(`should render a BlueBlueImage`, async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<ImageBackground source="Logo" style={{ width: 100 }}>
					<Text>Foo</Text>
				</ImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ImageBackground);

		expect(
			wrapper
				.find('ImageBackground')
				.last()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it(`should render a BlueBlueImage`, async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<ImageBackground source="Logo" style={{ width: 100 }}>
					<Text>Foo</Text>
				</ImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ImageBackground);

		expect(
			wrapper
				.find('Image')
				.first()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it(`should render a backup BlueBlueImage`, async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<ImageBackground source={['Icon', 'Logo']} style={{ width: 100 }}>
					<Text>Foo</Text>
				</ImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ImageBackground);

		expect(
			wrapper
				.find('Image')
				.first()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it(`should render a backup BlueBlueImage from source prop`, async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<ImageBackground source={['Icon', 'Logo']} style={{ width: 100 }}>
					<Text>Foo</Text>
				</ImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ImageBackground);

		expect(
			wrapper
				.find('Image')
				.first()
				.prop('source')
		).toMatchObject({
			uri: './Logo.jpg',
		});
	});

	it(`should render just children if there is not source prop`, async () => {
		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<ImageBackground>
					<Text>Foo</Text>
				</ImageBackground>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ImageBackground);

		expect(wrapper.find('Image').exists()).toBe(false);
		expect(
			wrapper
				.find('Text')
				.last()
				.text()
		).toBe('Foo');
	});
});
