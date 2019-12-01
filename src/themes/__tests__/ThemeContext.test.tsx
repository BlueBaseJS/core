import { BlueBase } from '../../BlueBase';
import { BlueBaseApp } from '../../index';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { ThemeDemo } from '../__stories__/ThemeDemo';
import { ThemePicker } from '../__stories__/ThemePicker';
import { ThemeProvider } from '../..';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';
describe('ThemeContext', () => {
	test(`should render a ThemeDemo component with themed background color`, async () => {
		const BB = new BlueBase();
		await BB.boot();

		const wrapper = mount(
			<BlueBaseContext.Provider value={BB}>
				<ThemeProvider>
					<ThemeDemo />
				</ThemeProvider>
			</BlueBaseContext.Provider>
		);

		// Wait for render
		await waitForElement(wrapper as any, ThemeDemo);

		const view = wrapper
			.find('ThemeDemo')
			.childAt(0)
			.first();
		expect((view.prop('style') as any).backgroundColor).toBe('#f5f5f5');
	});

	test(`should change theme based on callback function`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ThemePicker />
				<ThemeDemo />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, ThemeDemo);
		// expect(wrapper).toMatchSnapshot();

		// Check theme
		let view = wrapper
			.find('ThemeDemo')
			.childAt(0)
			.first();
		expect((view.prop('style') as any).backgroundColor).toBe('#f5f5f5');
		expect(
			wrapper
				.find('ThemeDemo')
				.find('Text')
				.last()
				.text()
		).toBe('BlueBase Light');

		// Change theme
		const onValueChange: any = wrapper.find('Picker').prop('onValueChange');
		onValueChange('bluebase-dark');

		await waitForElement(wrapper as any, ThemeDemo);
		// expect(wrapper).toMatchSnapshot();

		// Verify that background color is dark
		view = wrapper
			.find('ThemeDemo')
			.childAt(0)
			.first();
		expect((view.prop('style') as any).backgroundColor).toBe('#303030');
		expect(
			wrapper
				.find('ThemeDemo')
				.find('Text')
				.last()
				.text()
		).toBe('BlueBase Dark');
	});

	test(`should throw render error state if theme is not found`, async () => {
		const BB = new BlueBase();
		await BB.boot({ configs: { 'theme.name': 'foo' } });
		BB.Logger.warn = jest.fn();

		const wrapper = mount(
			<BlueBaseContext.Provider value={BB}>
				<ThemeProvider>
					<ThemeDemo />
				</ThemeProvider>
			</BlueBaseContext.Provider>
		);

		// Wait for render
		await waitForElement(wrapper, 'ThemeDemo');

		await wait(1000);
		wrapper.update();

		expect(
			wrapper
				.find('ThemeDemo Body1 Text')
				.last()
				.text()
		).toBe('BlueBase Light');

		expect(BB.Logger.warn).toHaveBeenCalledTimes(1);
		expect(BB.Logger.warn).toHaveBeenLastCalledWith(
			'Could not change theme. Reason: Theme with the key "foo" does not exist.'
		);

		wrapper.unmount();
	});

	test(`should override a theme`, async () => {
		const BB = new BlueBase();
		await BB.boot({ configs: { 'theme.name': 'foo' } });

		const wrapper = mount(
			<BlueBaseContext.Provider value={BB}>
				<ThemeProvider
					theme="bluebase-dark"
					overrides={{ palette: { background: { default: 'red' } } }}
				>
					<ThemeDemo />
				</ThemeProvider>
			</BlueBaseContext.Provider>
		);

		// Wait for render
		await waitForElement(wrapper as any, ThemeDemo);

		// Check theme
		const view = wrapper.find('ThemeDemo [testID="box"]').first();
		expect(view.prop('style')!.backgroundColor).toBe('red');
		expect(
			wrapper
				.find('ThemeDemo Body1 Text')
				.last()
				.text()
		).toBe('BlueBase Dark');

		wrapper.unmount();
	});
});
