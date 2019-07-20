import { BlueBaseApp } from '../../../';
import React from 'react';
import { Redirect } from '../Redirect';
import { mount } from 'enzyme';
import { renderChildrenWithProps } from '../../../utils';
import { waitForElement } from 'enzyme-async-helpers';

let stubActions: any = {};

export const NavigationActions = ({ children }: any) =>
	renderChildrenWithProps(children, stubActions);

describe('Redirect', () => {
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

	test(`should call the replace function with the given routeName`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Redirect routeName="Foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Redirect);

		expect(stubActions.replace).toBeCalledTimes(1);
		expect(stubActions.replace).toBeCalledWith('Foo', undefined);

		expect(stubActions.push).toBeCalledTimes(0);

		expect(stubActions).toMatchSnapshot();
	});

	test(`should call the replace function with the given path`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Redirect path="/foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Redirect);

		expect(stubActions.replace).toBeCalledTimes(1);
		expect(stubActions.replace).toBeCalledWith({ path: '/foo' }, undefined);

		expect(stubActions.push).toBeCalledTimes(0);

		expect(stubActions).toMatchSnapshot();
	});

	test(`should call the push function with the given routeName`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Redirect routeName="Foo" push />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Redirect);

		expect(stubActions.push).toBeCalledTimes(1);
		expect(stubActions.push).toBeCalledWith('Foo', undefined);

		expect(stubActions.replace).toBeCalledTimes(0);

		expect(stubActions).toMatchSnapshot();
	});

	test(`should not do anything if there is no routeName or path prop`, async () => {
		const components = {
			NavigationActions,
		};

		const wrapper = mount(
			<BlueBaseApp components={components}>
				<Redirect />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Redirect);

		expect(stubActions.push).toBeCalledTimes(0);
		expect(stubActions.replace).toBeCalledTimes(0);

		expect(stubActions).toMatchSnapshot();
	});
});
