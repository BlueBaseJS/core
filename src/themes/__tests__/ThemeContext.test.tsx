import { BlueBase } from '../../BlueBase';
import { BlueBaseApp } from '../../index';
import { ModePicker } from '../__stories__/ModePicker';
import React from 'react';
import { ThemeDemo } from '../__stories__/ThemeDemo';
import { ThemePicker } from '../__stories__/ThemePicker';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';
describe('ThemeContext', () => {
	test(`should render a ThemeDemo component with themed background color`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ThemeDemo />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, ThemeDemo);

		expect((wrapper.find('[testID="box"]').first().prop('style') as any).backgroundColor).toBe(
			'#f5f5f5'
		);
	});

	test(`should change theme based on callback function`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ThemePicker />
				<ModePicker />
				<ThemeDemo />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, ThemeDemo);

		// Check theme
		let view = wrapper.find('[testID="box"]').first();
		expect((view.prop('style') as any).backgroundColor).toBe('#f5f5f5');
		expect(wrapper.find(ThemeDemo).find('Body1 Text').last().text()).toBe('BlueBase Theme');

		// Change theme
		const onValueChange: any = wrapper.find(ModePicker).find('Picker').prop('onValueChange');
		onValueChange('dark');

		await waitForElement(wrapper as any, ThemeDemo);

		// Verify that background color is dark
		view = wrapper.find(ThemeDemo).childAt(0).first();
		expect((view.prop('style') as any).backgroundColor).toBe('#303030');
		expect(wrapper.find(ThemeDemo).find('Text').last().text()).toBe('BlueBase Theme');
	});

	test(`should throw render error state if theme is not found`, async () => {
		const BB = new BlueBase();
		// await BB.boot({ configs: { 'theme': 'foo' } });
		BB.Logger.warn = jest.fn();

		const wrapper = mount(
			<BlueBaseApp configs={{ theme: 'foo' }} BB={BB}>
				<ThemeDemo />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, ThemeDemo);

		await wait(1000);
		wrapper.update();

		expect(wrapper.find(ThemeDemo).find('Body1 Text').last().text()).toBe('BlueBase Theme');

		expect(BB.Logger.warn).toHaveBeenCalledTimes(1);
		expect(BB.Logger.warn).toHaveBeenLastCalledWith(
			'Could not load theme. Reason: Theme with the key "foo" does not exist. Falling back to default theme.'
		);

		wrapper.unmount();
	});

	test(`should override a theme`, async () => {
		const wrapper = mount(
			<BlueBaseApp
				configs={{
					theme: 'foo',
					'theme.overrides': { light: { palette: { background: { default: 'red' } } } },
				}}
			>
				<ThemeDemo />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, ThemeDemo);

		// Check theme
		const view = wrapper.find(ThemeDemo).find('[testID="box"]').first();

		expect(view.prop('style')!.backgroundColor).toBe('red');

		expect(wrapper.find(ThemeDemo).find('Body1 Text').last().text()).toBe('BlueBase Theme');

		wrapper.unmount();
	});
});
