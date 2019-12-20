import { BlueBaseApp } from '../../../';
import { Link } from '../Link';
import React from 'react';
import { mount } from 'enzyme';
import { renderChildrenWithProps } from '../../../utils';
import { waitForElement } from 'enzyme-async-helpers';

let stubActions: any = {};

export const NavigationActions = ({ children }: any) =>
	renderChildrenWithProps(children, stubActions);

describe('Link', () => {
	beforeEach(() => {
		stubActions = {
			getParam: jest.fn(),
			goBack: jest.fn(),
			navigate: jest.fn(),
			pop: jest.fn(),
			push: jest.fn(),
			replace: jest.fn(),
			setParams: jest.fn(),
			source: null,
			state: {
				key: '',
				params: {},
				routeName: '',
				url: '',
			},
		};
	});

	test(`should call the navigate function with the given routeName`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Link routeName="Foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		const onPress: any = wrapper.find('Link TouchableItem').prop('onPress');
		onPress(
			{
				defaultPrevented: false,
				preventDefault: () => {
					return;
				},
			},
			stubActions
		);

		expect(stubActions.navigate).toBeCalledTimes(1);
		expect(stubActions.navigate).toBeCalledWith('Foo', undefined);

		expect(stubActions.push).toBeCalledTimes(0);
		expect(stubActions.replace).toBeCalledTimes(0);
	});

	test(`should call the push function with the given routeName`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Link routeName="Foo" method="push" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		const onPress: any = wrapper.find('Link TouchableItem').prop('onPress');
		onPress(
			{
				defaultPrevented: false,
				preventDefault: () => {
					return;
				},
			},
			stubActions
		);

		expect(stubActions.push).toBeCalledTimes(1);
		expect(stubActions.push).toBeCalledWith('Foo', undefined);

		expect(stubActions.navigate).toBeCalledTimes(0);
		expect(stubActions.replace).toBeCalledTimes(0);
	});

	test(`should call the push function with the given path`, async () => {
		jest.mock('Platform', () => {
			const Platform = (require as any).requireActual('Platform');
			Platform.OS = 'web';
			return Platform;
		});

		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Link path="/foo" method="push" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		const onPress: any = wrapper.find('Link a').prop('onClick');
		onPress(
			{
				defaultPrevented: false,
				preventDefault: () => {
					return;
				},
			},
			stubActions
		);

		expect(stubActions.push).toBeCalledTimes(1);
		expect(stubActions.push).toBeCalledWith({ path: '/foo' }, undefined);

		expect(stubActions.navigate).toBeCalledTimes(0);
		expect(stubActions.replace).toBeCalledTimes(0);
	});

	test(`should call the replace function with the given path`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Link path="/foo" replace />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		const onPress: any = wrapper.find('Link a').prop('onClick');
		onPress(
			{
				defaultPrevented: false,
				preventDefault: () => {
					return;
				},
			},
			stubActions
		);

		expect(stubActions.replace).toBeCalledTimes(1);
		expect(stubActions.replace).toBeCalledWith({ path: '/foo' }, undefined);

		expect(stubActions.push).toBeCalledTimes(0);
	});

	test(`should not do anything if event.defaultPrevented is true`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Link path="/foo" replace />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		const onPress: any = wrapper.find('Link a').prop('onClick');
		onPress(
			{
				defaultPrevented: true,
				preventDefault: () => {
					return;
				},
			},
			stubActions
		);

		expect(stubActions.replace).toBeCalledTimes(0);
		expect(stubActions.push).toBeCalledTimes(0);
	});

	test(`should call the push function with the given path`, async () => {
		const customOnPress = jest.fn();

		const wrapper = mount(
			<BlueBaseApp>
				<Link path="/foo" onPress={customOnPress} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		const onPress: any = wrapper.find('Link a').prop('onClick');
		onPress(
			{
				defaultPrevented: false,
				preventDefault: () => {
					return;
				},
			},
			stubActions
		);

		expect(customOnPress).toBeCalledTimes(1);

		expect(stubActions.push).toBeCalledTimes(0);
		expect(stubActions.replace).toBeCalledTimes(0);
	});

	test(`should not do anything if there is no path or routeName prop`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Link />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		const onPress: any = wrapper.find('Link TouchableItem').prop('onPress');
		onPress(
			{
				defaultPrevented: false,
				preventDefault: () => {
					return;
				},
			},
			stubActions
		);

		expect(stubActions.push).toBeCalledTimes(0);
		expect(stubActions.replace).toBeCalledTimes(0);
	});

	test(`should not render anything if component prop is null`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Link component={null as any} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		expect(
			wrapper
				.find('Link')
				.last()
				.children().length
		).toBe(0);
	});
});
