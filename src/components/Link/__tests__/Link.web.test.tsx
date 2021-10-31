jest.mock('react-native/Libraries/Utilities/Platform', () => {
	const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
	Platform.OS = 'web';
	return Platform;
});

import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import { NavigationContext } from '../../../contexts';
import { BlueBaseApp } from '../../../OfflineComponents/BlueBaseApp';
import { Link } from '../Link';

const createStubActions = () => ({
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
});

describe('Link', () => {
	// afterEach(() => {

	// });

	test('should render ExternalLink on web', async () => {
		const stubActions = createStubActions();

		const wrapper = mount(
			<BlueBaseApp>
				<NavigationContext.Provider value={stubActions}>
					<Link path="/foo" method="push" />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Link);

		// expect(wrapper.find(Link)).toMatchSnapshot();
		const onPress: any = wrapper.find('Link ExternalLink').prop('onPress');
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
});
