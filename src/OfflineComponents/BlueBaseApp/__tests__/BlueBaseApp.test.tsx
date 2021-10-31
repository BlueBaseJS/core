/* eslint-disable max-len */
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';
import wait from 'waait';

import { BlueBase } from '../../../BlueBase';
import { BlueBaseAppError } from '../../BlueBaseAppError';
import { BlueBaseApp } from '../BlueBaseApp';

declare const global: any;

const Bang = () => {
	throw Error('💥 Boom!');
};

const BangNull = () => {
	throw null;
};

describe('BlueBaseApp', () => {
	it('should render BlueBaseApp', async () => {
		const wrapper = mount(<BlueBaseApp />);

		// // Will show loading
		// expect(
		// 	wrapper
		// 		.find('BlueBaseApp Text')
		// 		.last()
		// 		.text()
		// ).toBe('Loading');

		// Wait for state update
		await waitForElement(wrapper, 'HomeScreen');
		wrapper.update();

		expect(wrapper.find('BlueBaseApp HomeScreen Text').last().text()).toBe(
			'Welcome to BlueBase Framework!'
		);

		wrapper.unmount();
	});

	it('should render BlueBaseApp with custom child', async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Text testID="Custom">🚀 BlueBase System Content!</Text>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, '[testID="Custom"]');

		expect(wrapper.find('BlueBaseApp Text').last().text()).toBe('🚀 BlueBase System Content!');

		wrapper.unmount();
	});

	it('should render error state when boot throws an error', async () => {
		const BB = new BlueBase();
		BB.Configs.setValue('development', true);
		(BB as any).bootInternal = () => {
			throw Error('Boot Error!');
		};

		const wrapper = mount(<BlueBaseApp BB={BB} ErrorComponent={BlueBaseAppError} />);

		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-title"]');

		expect(wrapper.find('[testID="error-title"]').last().text()).toBe('ERROR');
		expect(wrapper.find('[testID="error-message"]').last().text()).toBe('Boot Error!');

		wrapper.unmount();
	});

	it('should render error state when a child throws an error', async () => {
		const wrapper = mount(
			<BlueBaseApp ErrorComponent={BlueBaseAppError}>
				<Bang />
			</BlueBaseApp>
		);

		// Wait for state update
		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-title"]');
		wrapper.update();

		expect(wrapper.find('[testID="error-title"]').last().text()).toBe('ERROR');
		expect(wrapper.find('[testID="error-message"]').last().text()).toBe('💥 Boom!');

		wrapper.unmount();
	});

	it('should render error state with custom message when a child throws a null error', async () => {
		const wrapper = mount(
			<BlueBaseApp ErrorComponent={BlueBaseAppError}>
				<BangNull />
			</BlueBaseApp>
		);

		// Wait for state update
		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-title"]');

		expect(wrapper.find('[testID="error-title"]').last().text()).toBe('ERROR');
		expect(wrapper.find('[testID="error-message"]').last().text()).toBe(
			'An unknown error occurred.'
		);

		wrapper.unmount();
	});

	it('should render error state with custom message when in production mode', async () => {
		const wrapper = mount(
			<BlueBaseApp configs={{ development: false }} ErrorComponent={BlueBaseAppError}>
				<Bang />
			</BlueBaseApp>
		);

		// Wait for state update
		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-button"]');

		expect(wrapper.find('ErrorObserver').prop('bootCount')).toBe(3);

		const onPress: any = wrapper
			.find('BlueBaseAppError [testID="error-button"]')
			.first()
			.prop('onPress');

		await wait(500);
		onPress();

		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-button"]');
		// wrapper.update();

		expect(wrapper.find('ErrorObserver').prop('bootCount')).toBe(8);
	});

	// tslint:disable-next-line: max-line-length
	it('should render error state with actual error message when development config is undefined, && isProduction is false', async () => {
		const BB = new BlueBase();
		(BB as any).bootInternal = () => {
			throw Error('Boot Error!');
		};

		const wrapper = mount(<BlueBaseApp BB={BB} ErrorComponent={BlueBaseAppError} />);

		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-title"]');

		expect(wrapper.find('[testID="error-title"]').last().text()).toBe('ERROR');
		expect(wrapper.find('[testID="error-message"]').last().text()).toBe('Boot Error!');

		wrapper.unmount();
	});

	// tslint:disable-next-line: max-line-length
	it('should render error state with custom error message when development config is undefined, && isProduction is true', async () => {
		const BB = new BlueBase();
		(BB as any).bootInternal = () => {
			throw Error('Boot Error!');
		};

		global.process.env.NODE_ENV = 'production';

		const wrapper = mount(<BlueBaseApp BB={BB} ErrorComponent={BlueBaseAppError} />);

		await waitForElement(wrapper, 'BlueBaseAppError [testID="error-title"]');

		expect(wrapper.find('[testID="error-title"]').last().text()).toBe('ERROR');
		expect(wrapper.find('[testID="error-message"]').last().text()).toBe(
			'An unknown error occurred.'
		);

		wrapper.unmount();
	});

	it('should throw error using the test error component', async () => {
		const BB = new BlueBase();
		(BB as any).bootInternal = () => {
			throw Error('Boot Error!');
		};

		global.process.env.NODE_ENV = 'test';

		let message = '';

		try {
			mount(<BlueBaseApp BB={BB} />);
		} catch (error: any) {
			message = error.message;
		}

		expect(message).toBe('Boot Error!');
	});
});
