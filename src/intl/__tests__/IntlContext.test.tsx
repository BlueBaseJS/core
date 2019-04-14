import { Body2, FormattedMessage, H5, View } from '../../getComponent';
import { BlueBaseApp } from '../../index';
import { IntlMessages } from '../IntlContext';
import { LocalePicker } from '../__stories__/LocalePicker';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import { Text } from 'react-native';

const filters = {
	'bluebase.intl.messages.ur': (messages: IntlMessages) => ({
		...messages,
		'Hello! 👋': 'ہیلو!'
	})
};

describe('IntlContext', () => {

	test(`should render default messages`, async () => {
		const wrapper = mount(
			<BlueBaseApp filters={filters}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>Hello! 👋</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>How are you?</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		expect(wrapper.find('[testID="Heading"]').last().text()).toBe('Hello! 👋');
		expect(wrapper.find('[testID="desc"]').last().text()).toBe('How are you?');
		expect((wrapper.find('Text [testID="desc"]').first().prop('style') as any).color).toBe('blue');
	});

	test(`should render translated messages`, async () => {
		const wrapper = mount(
			<BlueBaseApp filters={filters} configs={{ locale: 'ur' }}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>Hello! 👋</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>How are you?</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		expect(wrapper.find('[testID="Heading"]').last().text()).toBe('ہیلو!');
		expect(wrapper.find('[testID="desc"]').last().text()).toBe('How are you?');
		expect((wrapper.find('Text [testID="desc"]').first().prop('style') as any).color).toBe('blue');
	});

	test(`FormattedMessage should render child as is, if its not a string`, async () => {

		const node: any = <Text>Hello! 👋</Text>;

		const wrapper = mount(
			<BlueBaseApp filters={filters} configs={{ locale: 'ur' }}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>
						{node}
					</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		expect(wrapper.find('[testID="Heading"]').last().text()).toBe('Hello! 👋');
	});

	test(`should show error state even`, async () => {

		const badFilters = {
			'bluebase.intl.messages.ur': () => {
				throw Error('Bang Bang!');
			}
		};

		const wrapper = mount(
			<BlueBaseApp filters={badFilters} configs={{ locale: 'ur' }}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>ہیلو!</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>How are you?</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, Body2);

		expect(wrapper.find('Body2 Text').last().text()).toBe('Bang Bang!');
	});


	test(`should change locale by callback function`, async (done) => {
		const wrapper = mount(
			<BlueBaseApp filters={filters}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>Hello! 👋</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		const onValueChange = wrapper.find('LocalePicker Picker').first().prop('onValueChange') as any;

		onValueChange('ur');

		await Promise.resolve();

		setTimeout(() => {
			wrapper.update();
			// expect(wrapper).toMatchSnapshot();
			expect(wrapper.find('[testID="Heading"]').last().text()).toBe('ہیلو!');
			done();
		});
	});


	// test(`should render a overwritten ThemeDemo component with red background color`, (done) => {
	// 	const component = TestRenderer.create(
	// 		<BlueBaseApp>
	// 			<ThemeProvider theme="bluebase-dark" overrides={{ palette: { background: { default: 'red' } } }}>
	// 				<ThemeDemo />
	// 			</ThemeProvider>
	// 		</BlueBaseApp>
	// 	);


	// 	setTimeout(() => {
	// 		const tree = component.toJSON();
	// 		expect(tree).toMatchSnapshot();
	// 		expect((tree as any).props.style.backgroundColor).toBe('red');
	// 		done();
	// 	});
	// });

	// test(`should change theme based on callback function`, async () => {
	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<LocalePicker />
	// 			<ThemeDemo />
	// 		</BlueBaseApp>
	// 	);

	// 	// Wait for render
	// 	await waitForElement(wrapper as any, ThemeDemo);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	// Check theme
	// 	let view = wrapper.find('ThemeDemo').childAt(0).first();
	// 	expect((view.prop('style') as any).backgroundColor).toBe('#fafafa');
	// 	expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Light');

	// 	// Change theme
	// 	const onValueChange: any = wrapper.find('Picker').prop('onValueChange');
	// 	onValueChange('bluebase-dark');

	// 	await waitForElement(wrapper as any, ThemeDemo);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	// Verify that background color is dark
	// 	view = wrapper.find('ThemeDemo').childAt(0).first();
	// 	expect((view.prop('style') as any).backgroundColor).toBe('#303030');
	// 	expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Dark');
	// });

	// test(`should throw an error when changing theme based to unknown theme`, async () => {
	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<LocalePicker />
	// 			<ThemeDemo />
	// 		</BlueBaseApp>
	// 	);

	// 	// Wait for render
	// 	await waitForElement(wrapper as any, ThemeDemo);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	// Check theme
	// 	const view = wrapper.find('ThemeDemo').childAt(0).first();
	// 	expect((view.prop('style') as any).backgroundColor).toBe('#fafafa');
	// 	expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Light');

	// 	// Check Subscription
	// 	const Provider = wrapper.find('ThemeProvider').last().instance();
	// 	const subscriptionId = (Provider as any).subscriptionId;
	// 	expect(subscriptionId).toBeDefined();

	// 	// Change theme
	// 	const onValueChange: any = wrapper.find('Picker').prop('onValueChange');
	// 	onValueChange('does-not-exist');

	// 	await waitForElement(wrapper as any, ErrorState);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	// Verify that background color is dark
	// 	const error = wrapper.find('ErrorState').last().prop('error') as Error;
	// 	expect(error.message).toBe('Could not change theme. Reason: Theme with the key "does-not-exist" does not exist.');

	// 	// Unmount to unsubscribe
	// 	wrapper.unmount();
	// 	// TODO: check if subscription ID gets deleted
	// });

	// test(`should throw render error state if state.theme is undefined`, async () => {
	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<LocalePicker />
	// 			<ThemeDemo />
	// 		</BlueBaseApp>
	// 	);

	// 	// Wait for render
	// 	await waitForElement(wrapper as any, ThemeDemo);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	// Check theme
	// 	wrapper.find('ThemeProvider').setState({ theme: undefined });

	// 	await waitForElement(wrapper as any, ErrorState);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	// Verify that background color is dark
	// 	const error = wrapper.find('ErrorState').last().prop('error') as Error;
	// 	expect(error.message).toBe('Could not load theme.');
	// });

	// test(`should override a theme`, async () => {
	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<ThemeProvider theme="bluebase-dark" overrides={{ palette: { background: { default: 'red' } } }}>
	// 				<ThemeDemo />
	// 			</ThemeProvider>
	// 		</BlueBaseApp>
	// 	);

	// 	// Wait for render
	// 	await waitForElement(wrapper as any, ThemeDemo);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	// Check theme
	// 	const view = wrapper.find('ThemeDemo').childAt(0).first();
	// 	expect((view.prop('style') as any).backgroundColor).toBe('red');
	// 	expect(wrapper.find('ThemeDemo').find('Text').last().text()).toBe('BlueBase Dark');

	// 	// Check Subscription
	// 	const Provider = wrapper.find('ThemeProvider').last().instance();
	// 	const subscriptionId = (Provider as any).subscriptionId;
	// 	expect(subscriptionId).toBeUndefined();

	// 	wrapper.unmount();
	// });

});

