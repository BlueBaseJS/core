import { BlueBase } from '../../../BlueBase';
import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';

declare const global: any;

const Bang = () => {
	throw Error('💥 Boom!');
};

const BangNull = () => {
	throw null;
};

describe('BlueBaseApp', () => {

	test(`should render BlueBaseApp`, async () => {
		const wrapper = mount(
			<BlueBaseApp />
		);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text').last().text()).toBe('Loading');

		// Wait for state update
		await waitForState(wrapper as any, (state: any) => state.loading === false);
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp HomeScreen Text').last().text()).toBe('Welcome to BlueBase Framework!');
	});

	test(`should render BlueBaseApp with custom child`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Text>🚀 BlueBase System Content!</Text>
			</BlueBaseApp>
		);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text').last().text()).toBe('Loading');

		// Wait for state update
		await waitForState(wrapper as any, (state: any) => state.loading === false);
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text').last().text()).toBe('🚀 BlueBase System Content!');
	});

	test(`should render default app when boot doesn't return anything`, (done: any) => {

		const BB = new BlueBase();
		BB.Configs.setValue('development', true);
		BB.boot = (() => { Promise.resolve(null); }) as any;

		const rendered: any = TestRenderer.create(
			<BlueBaseApp BB={BB} />
		);

		// After loading
		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toBe(null);
			// expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render error state when boot throws an error`, async () => {

		const BB = new BlueBase();
		BB.Configs.setValue('development', true);
		BB.boot = () => { throw Error('Boot Error!'); };

		const wrapper = mount(<BlueBaseApp BB={BB} />);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text Text').at(0).text()).toBe('🚨 BlueBase Error');
		expect(wrapper.find('BlueBaseApp Text Text').at(1).text()).toBe('Boot Error!');
	});

	test(`should render error state when a child throws an error`, async () => {
		const wrapper = mount(<BlueBaseApp><Bang /></BlueBaseApp>);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text').last().text()).toBe('Loading');

		// Wait for state update
		await waitForState(wrapper as any, (state: any) => state.loading === false);
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text Text').at(0).text()).toBe('🚨 BlueBase Error');
		expect(wrapper.find('BlueBaseApp Text Text').at(1).text()).toBe('💥 Boom!');
	});

	test(`should render error state with custom message when a child throws a null error`, async () => {
		const wrapper = mount(<BlueBaseApp><BangNull /></BlueBaseApp>);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text').last().text()).toBe('Loading');

		// Wait for state update
		await waitForState(wrapper as any, (state: any) => state.loading === false);
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text Text').at(0).text()).toBe('🚨 BlueBase Error');
		expect(wrapper.find('BlueBaseApp Text Text').at(1).text()).toBe('An unknown error occured.');
	});

	test(`should render error state with custom message when in production mode`, async () => {

		const wrapper = mount(
			<BlueBaseApp configs={{ development: false }}>
				<Bang />
			</BlueBaseApp>
		);

		// Will show loading
		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text').last().text()).toBe('Loading');

		// Wait for state update
		await waitForState(wrapper as any, (state: any) => state.loading === false);
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text Text').at(0).text()).toBe('🚨 BlueBase Error');
		expect(wrapper.find('BlueBaseApp Text Text').at(1).text()).toBe('An unknown error occured.');
	});

	// tslint:disable-next-line: max-line-length
	test(`should render error state with actual error message when development config is undefined, && isProduction is false`, async () => {

		const BB = new BlueBase();
		BB.boot = () => { throw Error('Boot Error!'); };

		const wrapper = mount(
			<BlueBaseApp BB={BB} />
		);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text Text').at(0).text()).toBe('🚨 BlueBase Error');
		expect(wrapper.find('BlueBaseApp Text Text').at(1).text()).toBe('Boot Error!');
	});

	// tslint:disable-next-line: max-line-length
	test(`should render error state with custom error message when development config is undefined, && isProduction is true`, async () => {

		const BB = new BlueBase();
		BB.boot = () => { throw Error('Boot Error!'); };

		global.process.env.NODE_ENV = 'production';

		const wrapper = mount(
			<BlueBaseApp BB={BB} />
		);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('BlueBaseApp Text Text').at(0).text()).toBe('🚨 BlueBase Error');
		expect(wrapper.find('BlueBaseApp Text Text').at(1).text()).toBe('An unknown error occured.');
	});
});
