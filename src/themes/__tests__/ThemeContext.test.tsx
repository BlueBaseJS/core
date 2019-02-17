import { BlueBaseApp } from '../../index';
import { ErrorState } from '../../getComponent';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeDemo } from '../__stories__/ThemeDemo';
import { ThemePicker } from '../__stories__/ThemePicker';
import { ThemeProvider } from '../..';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThemeContext', () => {

	test(`should render a ThemeDemo component with themed background color`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<ThemeDemo />
			</BlueBaseApp>
		);


		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).props.style.backgroundColor).toBe('#fafafa');
			done();
		});
	});


	test(`should render a overwritten ThemeDemo component with red background color`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<ThemeProvider theme="bluebase-dark" overrides={{ palette: { background: { default: 'red' } } }}>
					<ThemeDemo />
				</ThemeProvider>
			</BlueBaseApp>
		);


		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).props.style.backgroundColor).toBe('red');
			done();
		});
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
		expect(wrapper).toMatchSnapshot();

		// Check theme
		let view = wrapper.find('ThemeDemo').childAt(0).first();
		expect((view.prop('style') as any).backgroundColor).toBe('#fafafa');
		expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Light');

		// Change theme
		const onValueChange: any = wrapper.find('Picker').prop('onValueChange');
		onValueChange('bluebase-dark');

		await waitForElement(wrapper, ThemeDemo);
		expect(wrapper).toMatchSnapshot();

		// Verify that background color is dark
		view = wrapper.find('ThemeDemo').childAt(0).first();
		expect((view.prop('style') as any).backgroundColor).toBe('#303030');
		expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Dark');
	});

	test(`should throw an error when changing theme based to unknown theme`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ThemePicker />
				<ThemeDemo />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, ThemeDemo);
		expect(wrapper).toMatchSnapshot();

		// Check theme
		const view = wrapper.find('ThemeDemo').childAt(0).first();
		expect((view.prop('style') as any).backgroundColor).toBe('#fafafa');
		expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Light');

		// Check Subscription
		const Provider = wrapper.find('ThemeProvider').last().instance();
		const subscriptionId = (Provider as any).subscriptionId;
		expect(subscriptionId).toBeDefined();

		// Change theme
		const onValueChange: any = wrapper.find('Picker').prop('onValueChange');
		onValueChange('does-not-exist');

		await waitForElement(wrapper, ErrorState);
		expect(wrapper).toMatchSnapshot();

		// Verify that background color is dark
		const error = wrapper.find('ErrorState').last().prop('error') as Error;
		expect(error.message).toBe('Could not change theme. Reason: Theme with the key "does-not-exist" does not exist.');

		// Unmount to unsubscribe
		wrapper.unmount();
		// TODO: check if subscription ID gets deleted
	});

	test(`should throw render error state if state.theme is undefined`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ThemePicker />
				<ThemeDemo />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, ThemeDemo);
		expect(wrapper).toMatchSnapshot();

		// Check theme
		wrapper.find('ThemeProvider').setState({ theme: undefined });

		await waitForElement(wrapper, ErrorState);
		expect(wrapper).toMatchSnapshot();

		// Verify that background color is dark
		const error = wrapper.find('ErrorState').last().prop('error') as Error;
		expect(error.message).toBe('Could not load theme.');
	});

	test(`should override a theme`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ThemeProvider theme="bluebase-dark" overrides={{ palette: { background: { default: 'red' } } }}>
					<ThemeDemo />
				</ThemeProvider>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, ThemeDemo);
		expect(wrapper).toMatchSnapshot();

		// Check theme
		const view = wrapper.find('ThemeDemo').childAt(0).first();
		expect((view.prop('style') as any).backgroundColor).toBe('red');
		expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Dark');

		// Check Subscription
		const Provider = wrapper.find('ThemeProvider').last().instance();
		const subscriptionId = (Provider as any).subscriptionId;
		expect(subscriptionId).toBeUndefined();

		wrapper.unmount();
	});

});

