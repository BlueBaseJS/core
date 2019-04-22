import { BlueBaseApp } from '../../BlueBaseApp';
import { BlueBaseImage } from '../BlueBaseImage';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('BlueBaseImage', () => {

	test(`should render a BlueBlueImage`, async() => {

		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImage resolve="Logo" source={{ uri: 'ignore.png' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImage);

		expect(wrapper.find('Image').first().prop('source')).toMatchObject({
			'uri': './Logo.jpg',
		});

	});

	test(`should render a BlueBlueImage`, async() => {

		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImage source="Logo" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImage);

		expect(wrapper.find('Image').first().prop('source')).toMatchObject({
			'uri': './Logo.jpg',
		});

	});


	test(`should render a backup BlueBlueImage`, async () => {

		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImage resolve={['Icon', 'Logo']} source={{ uri: 'ignore.png' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImage);

		expect(wrapper.find('Image').first().prop('source')).toMatchObject({
			'uri': './Logo.jpg',
		});
	});


	test(`should render an image from source if none is found`, async () => {

		const wrapper = mount(
			<BlueBaseApp assets={{ None: require('./Logo.jpg') }}>
				<BlueBaseImage resolve={['Icon', 'Logo']} source={{ uri: 'ignore.png' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImage);

		expect(wrapper.find('Image').first().prop('source')).toMatchObject({
			'uri': 'test-file-stub',
		});
	});


	test(`should render a backup BlueBlueImage from source prop`, async () => {

		const wrapper = mount(
			<BlueBaseApp assets={{ Logo: './Logo.jpg' }}>
				<BlueBaseImage source={['Icon', 'Logo']} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, BlueBaseImage);

		expect(wrapper.find('Image').first().prop('source')).toMatchObject({
			'uri': './Logo.jpg',
		});
	});

});
