import { BlueBaseApp } from '../../BlueBaseApp';
import { ErrorObserver } from '../ErrorObserver';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const Bang = () => {
	throw Error('💥 Boom!');
};

const BangNull = () => {
	throw null;
};

describe('ErrorObserver', () => {

	test(`Snapshot ErrorObserver`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorObserver>
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ErrorObserver);

		expect(wrapper.find('Text').last().text()).toBe('Hello');
	});

	test(`Snapshot ErrorObserver after complete rendering`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorObserver>
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ErrorObserver);

		expect(wrapper.find('Text').last().text()).toBe('Hello');
	});

	test(`Snapshot ErrorObserver after complete rendering with error`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorObserver
					error={{ name: '404', message: 'no page found' }}
					errorComponent={() => <Text>Error</Text>}
				>
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ErrorObserver);

		expect(wrapper.find('Text').last().text()).toBe('Error');
	});

	test(`Snapshot ErrorObserver after complete rendering with child as function`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorObserver>
				{
					() => <Text>Hello</Text>
				}
				</ErrorObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ErrorObserver);

		expect(wrapper.find('Text').last().text()).toBe('Hello');
	});

	test(`should catch an error when thrown by a child component`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorObserver>
					<Bang />
				</ErrorObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ErrorObserver);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Text').last().text()).toBe('💥 Boom!');
	});

	test(`should catch an error when thrown null by a child component`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorObserver>
					<BangNull />
				</ErrorObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ErrorObserver);

		expect(wrapper.find('Text').last().text()).toBe('An unknown error occurred.');
	});

	test(`should not catch an error because check error is null`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorObserver checkError={null as any} error={Error('Useless')} >
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, ErrorObserver);

		expect(wrapper.find('Text').last().text()).toBe('Hello');
	});


});
