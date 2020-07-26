import { NavigationContext, StubNavigationActionsObject } from '../../../contexts';

import { BlueBaseApp } from '../../..';
import { NavigationActions } from '../NavigationActions';
import { NavigationActionsObject } from '@bluebase/components';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('NavigationActions', () => {
	it(`should pass stub actions to the consumer`, async () => {
		const children = jest.fn().mockImplementation(() => <Text testID="content">Will render</Text>);
		const wrapper = mount(
			<NavigationContext.Provider value={StubNavigationActionsObject}>
				<BlueBaseApp>
					<NavigationActions>{children}</NavigationActions>
				</BlueBaseApp>
			</NavigationContext.Provider>
		);

		// Wait for render
		await waitForElement(wrapper, '[testID="content"]');

		expect(children).toHaveBeenCalledTimes(1);

		const actions: NavigationActionsObject = children.mock.calls[0][0];

		expect(actions).toMatchObject(StubNavigationActionsObject);
		expect(actions.push('some')).toBeUndefined();

		wrapper.unmount();
	});
});
