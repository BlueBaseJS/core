import React from 'react';
import { Text } from 'react-native';
import { applyStyles } from '../helpers';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const Demo = (props: any) => (<Text style={props.styles.root}>Demo Text</Text>);
Demo.defaultStyles = { root: { backgroundColor: 'red' } };

describe('applyStyles', () => {

	test(`apply styles without theme`, async () => {

		const ThemedDemo = applyStyles()(Demo);

		const wrapper = mount(
			<ThemedDemo />
		);

		// Wait for render
		await waitForElement(wrapper, ThemedDemo);

		expect(wrapper).toMatchSnapshot();

		const style = wrapper.find('Demo Text').first().prop('style') || {};
		expect(style.backgroundColor).toBe('red');
	});

	test(`apply styles without theme & unknown component name`, async () => {

		const ThemedDemo = applyStyles({ name: 'Foo' })(Demo);

		const wrapper = mount(
			<ThemedDemo />
		);

		// Wait for render
		await waitForElement(wrapper, ThemedDemo);

		expect(wrapper).toMatchSnapshot();

		const style = wrapper.find('Demo Text').first().prop('style') || {};
		expect(style.backgroundColor).toBe('red');
	});

});

