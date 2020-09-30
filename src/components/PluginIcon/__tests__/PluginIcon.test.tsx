import { BlueBaseApp } from '../../../';
import { BlueBaseAppError } from '../../../OfflineComponents';
import { DynamicIconProps } from '@bluebase/components';
import { PluginIcon } from '../PluginIcon';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('PluginIcon', () => {
	test(`should render an image icon for a registered plugin`, async () => {
		const plugin = {
			icon: {
				source: { uri: 'https://picsum.photos/200' },
				type: 'image' as DynamicIconProps['type'],
			},
			key: 'some',
			value: {},
		};

		const wrapper = mount(
			<BlueBaseApp plugins={[plugin]}>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'DynamicIcon');

		expect(wrapper.find('DynamicIcon').first().prop('type')).toBe('image');
	});

	test(`should render an image icon for a registered plugin where icon prop is a thunk`, async () => {
		const plugin = {
			icon: () => ({
				source: { uri: 'https://picsum.photos/200' },
				type: 'image' as DynamicIconProps['type'],
			}),
			key: 'some',
			value: {},
		};

		const wrapper = mount(
			<BlueBaseApp plugins={[plugin]}>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'DynamicIcon');

		expect(wrapper.find('DynamicIcon').first().prop('type')).toBe('image');
	});

	test(`should render null where plugin doesnt have an icon prop`, async () => {
		const plugin = {
			key: 'some',
			value: {},
		};

		const wrapper = mount(
			<BlueBaseApp plugins={[plugin]}>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'PluginIcon');

		expect(wrapper.find('DynamicIcon').exists()).toBe(false);
	});

	test(`should throw an error when a plugin is not registered`, async () => {
		const wrapper = mount(
			<BlueBaseApp ErrorComponent={BlueBaseAppError}>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		// Wait for state update
		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-title"]');

		expect(wrapper.find('[testID="error-title"]').last().text()).toBe('ERROR');
		expect(wrapper.find('[testID="error-message"]').last().text()).toBe(
			'There\'s no pluign registered with "some" key in the registry.'
		);
	});
});
