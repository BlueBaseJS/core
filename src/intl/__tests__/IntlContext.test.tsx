import { FormattedMessage, H5, View } from '../../getComponent';
import { I18nManager, Text } from 'react-native';

import { BlueBaseApp } from '../../index';
import { DirectionPicker } from '../__stories__/DirectionPicker';
import { IntlMessages } from '../IntlContext';
import { LocalePicker } from '../__stories__/LocalePicker';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const filters = {
	'bluebase.intl.messages.ur': (messages: IntlMessages) => ({
		...messages,
		'Hello! 👋': 'ہیلو!',
	}),
};

describe('IntlContext', () => {
	test(`should render default messages`, async () => {
		const wrapper = mount(
			<BlueBaseApp filters={filters}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>
						Hello! 👋
					</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>
						How are you?
					</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		expect(
			wrapper
				.find('[testID="Heading"]')
				.last()
				.text()
		).toBe('Hello! 👋');
		expect(
			wrapper
				.find('[testID="desc"]')
				.last()
				.text()
		).toBe('How are you?');
		expect(
			(wrapper
				.find('Text [testID="desc"]')
				.first()
				.prop('style') as any).color
		).toBe('blue');
	});

	test(`should render translated messages`, async () => {
		const wrapper = mount(
			<BlueBaseApp filters={filters} configs={{ locale: 'ur' }}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>
						Hello! 👋
					</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>
						How are you?
					</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		expect(
			wrapper
				.find('[testID="Heading"]')
				.last()
				.text()
		).toBe('ہیلو!');
		expect(
			wrapper
				.find('[testID="desc"]')
				.last()
				.text()
		).toBe('How are you?');
		expect(
			(wrapper
				.find('Text [testID="desc"]')
				.first()
				.prop('style') as any).color
		).toBe('blue');
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

		expect(
			wrapper
				.find('[testID="Heading"]')
				.last()
				.text()
		).toBe('Hello! 👋');
	});

	test(`should show error state even`, async () => {
		const badFilters = {
			'bluebase.intl.messages.ur': () => {
				throw Error('Bang Bang!');
			},
		};

		const wrapper = mount(
			<BlueBaseApp filters={badFilters} configs={{ locale: 'ur' }}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>
						ہیلو!
					</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>
						How are you?
					</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ErrorState');

		expect(
			wrapper
				.find('Body2 Text')
				.last()
				.text()
		).toBe('Bang Bang!');
	});

	test(`should change locale by callback function`, async () => {
		const wrapper = mount(
			<BlueBaseApp filters={filters}>
				<View>
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>
						Hello! 👋
					</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>
						How are you?
					</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		const onValueChange = wrapper
			.find('LocalePicker Picker')
			.first()
			.prop('onValueChange') as any;

		onValueChange('ur');
		wrapper.update();

		await waitForElement(wrapper as any, FormattedMessage);

		expect(
			wrapper
				.find('[testID="Heading"]')
				.last()
				.text()
		).toBe('ہیلو!');
	});

	test(`should set the direction to ltr`, async () => {
		const wrapper = mount(
			<BlueBaseApp filters={filters} configs={{ direction: 'ltr' }}>
				<View>
					<DirectionPicker />
					<LocalePicker />
					<FormattedMessage testID="Heading" component={H5}>
						Hello! 👋
					</FormattedMessage>
					<FormattedMessage testID="desc" style={{ color: 'blue' }}>
						How are you?
					</FormattedMessage>
				</View>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, FormattedMessage);

		const changeDirection = wrapper
			.find('DirectionPicker Picker')
			.first()
			.prop('onValueChange') as any;

		expect(I18nManager.isRTL).toBe(false);

		changeDirection('rtl');

		wrapper.update();

		const selectedValue = wrapper
			.find('DirectionPicker Picker')
			.first()
			.prop('selectedValue') as any;
		expect(selectedValue).toBe('rtl');
	});
});
