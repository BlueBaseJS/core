import { BlueBaseApp } from '../../BlueBaseApp';
import { HeaderTitle } from '../../../';
import React from 'react';
// import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';


describe('HeaderTitle', () => {

	test(`should render simple test`, async () => {

		const wrapper = mount(
			<BlueBaseApp>
        <HeaderTitle>A very long heading title sentence.</HeaderTitle>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderTitle);

		// Should render null
		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HeaderTitle').last().text()).toBe('A very long heading title sentence.');
	});


});
