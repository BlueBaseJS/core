import { BlueBase } from '../../../BlueBase';
import { BlueBaseApp } from '../BlueBaseApp';
import { BlueBaseAppError } from '../../BlueBaseAppError';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

declare const global: any;

const Bang = () => {
	throw Error('💥 Boom!');
};

const BangNull = () => {
	throw null;
};

describe('BlueBaseApp', () => {
	test(`should render BlueBaseApp`, async () => {
		const wrapper = mount(<BlueBaseApp />);

		// Will show loading
		expect(
			wrapper
				.find('BlueBaseApp Text')
				.last()
				.text()
		).toBe('Loading');

		// Wait for state update
		await waitForElement(wrapper, 'HomeScreen');
		wrapper.update();

		expect(
			wrapper
				.find('BlueBaseApp HomeScreen Text')
				.last()
				.text()
		).toBe('Welcome to BlueBase Framework!');
	});

	test(`should render BlueBaseApp with custom child`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Text testID="Custom">🚀 BlueBase System Content!</Text>
			</BlueBaseApp>
		);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text')
				.last()
				.text()
		).toBe('Loading');

		await waitForElement(wrapper, '[testID="Custom"]');

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text')
				.last()
				.text()
		).toBe('🚀 BlueBase System Content!');
	});

	test(`should render error state when boot throws an error`, async () => {
		const BB = new BlueBase();
		BB.Configs.setValue('development', true);
		(BB as any).bootInternal = () => {
			throw Error('Boot Error!');
		};

		const wrapper = mount(<BlueBaseApp BB={BB} />);

		await waitForElement(wrapper, BlueBaseAppError);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(0)
				.text()
		).toBe('🚨 Error');
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(1)
				.text()
		).toBe('Boot Error!');
	});

	test(`should render error state when a child throws an error`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Bang />
			</BlueBaseApp>
		);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text')
				.last()
				.text()
		).toBe('Loading');

		// Wait for state update
		await waitForElement(wrapper, 'BlueBaseAppError');
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(0)
				.text()
		).toBe('🚨 Error');
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(1)
				.text()
		).toBe('💥 Boom!');
	});

	test(`should render error state with custom message when a child throws a null error`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<BangNull />
			</BlueBaseApp>
		);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text')
				.last()
				.text()
		).toBe('Loading');

		// Wait for state update
		await waitForElement(wrapper, 'BlueBaseAppError');

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(0)
				.text()
		).toBe('🚨 Error');
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(1)
				.text()
		).toBe('An unknown error occurred.');
	});

	test(`should render error state with custom message when in production mode`, async () => {
		const wrapper = mount(
			<BlueBaseApp configs={{ development: false }}>
				<Bang />
			</BlueBaseApp>
		);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text')
				.last()
				.text()
		).toBe('Loading');

		// Wait for state update
		await waitForElement(wrapper, 'BlueBaseAppError');

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(0)
				.text()
		).toBe('🚨 Error');
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(1)
				.text()
		).toBe('An unknown error occured.');
	});

	// tslint:disable-next-line: max-line-length
	test(`should render error state with actual error message when development config is undefined, && isProduction is false`, async () => {
		const BB = new BlueBase();
		(BB as any).bootInternal = () => {
			throw Error('Boot Error!');
		};

		const wrapper = mount(<BlueBaseApp BB={BB} />);

		await waitForElement(wrapper, BlueBaseAppError);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(0)
				.text()
		).toBe('🚨 Error');
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(1)
				.text()
		).toBe('Boot Error!');
	});

	// tslint:disable-next-line: max-line-length
	test(`should render error state with custom error message when development config is undefined, && isProduction is true`, async () => {
		const BB = new BlueBase();
		(BB as any).bootInternal = () => {
			throw Error('Boot Error!');
		};

		global.process.env.NODE_ENV = 'production';

		const wrapper = mount(<BlueBaseApp BB={BB} />);

		await waitForElement(wrapper, BlueBaseAppError);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(0)
				.text()
		).toBe('🚨 Error');
		expect(
			wrapper
				.find('BlueBaseApp Text Text')
				.at(1)
				.text()
		).toBe('An unknown error occured.');
	});
});
