import * as Native from '../../../native';

import { BlueBaseApp } from '../../../';
import { ComponentState } from '../ComponentState';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ComponentState', () => {
	test(`should render ComponentState with all elements`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ComponentState
					title="Looks like your'e new here!"
					description="Start by creating your first entry."
					imageSource={{ uri: 'https://picsum.photos/200' }}
					styles={{ image: { width: 100, height: 100 } }}
					actionTitle="Tap to Create"
				/>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, ComponentState);

		// Check Component
		expect(
			wrapper
				.find('ComponentState Image')
				.last()
				.prop('source')
		).toMatchObject({
			uri: 'https://picsum.photos/200',
		});

		const styles = wrapper
			.find('ComponentState Image')
			.last()
			.prop('style');
		if (styles) {
			expect(styles.height).toBe(100);
			expect(styles.width).toBe(100);
		}
		expect(
			wrapper
				.find('ComponentState H6 Text')
				.last()
				.text()
		).toBe("Looks like your'e new here!");
		expect(
			wrapper
				.find('ComponentState Body2 Text')
				.last()
				.text()
		).toBe('Start by creating your first entry.');
		expect(
			wrapper
				.find('ComponentState Button Text')
				.last()
				.text()
		).toBe('Tap to Create');
	});

	test(`should render ComponentState with custom image`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ComponentState
					image={
						<Native.Image
							testID="Custom"
							style={{ width: 50, height: 50 }}
							source={{ uri: 'https://picsum.photos/200' }}
						/>
					}
					styles={{ image: { width: 100, height: 100 } }}
				/>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, ComponentState);

		// Check Component
		expect(
			wrapper
				.find('ComponentState Image')
				.last()
				.prop('source')
		).toMatchObject({
			uri: 'https://picsum.photos/200',
		});
		expect(
			wrapper
				.find('ComponentState Image')
				.last()
				.prop('style')
		).toMatchObject({
			height: 50,
			width: 50,
		});
		expect(
			wrapper
				.find('ComponentState Image')
				.last()
				.prop('testID')
		).toBe('Custom');
		expect(wrapper.exists('ComponentState H6')).toBe(false);
		expect(wrapper.exists('ComponentState Body2')).toBe(false);
		expect(wrapper.exists('ComponentState Button')).toBe(false);
	});
});
