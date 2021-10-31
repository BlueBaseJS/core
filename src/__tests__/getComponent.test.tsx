import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import TestRenderer from 'react-test-renderer';

import { BlueBaseApp } from '../';
import { getComponent } from '../getComponent';

describe('getComponent', () => {
	test('should render a text component', async () => {
		const Text = getComponent('Text');

		const wrapper = mount(
			<BlueBaseApp>
				<Text testID="test">A Text component</Text>
				<Text testID="test2">A Second Text component</Text>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, '[testID="test"]');

		expect(
			wrapper
				.find('Text[testID="test"]')
				.last()
				.text()
		).toBe('A Text component');
	});

	test('should throw an Error when no key is passed', () => {
		let message;

		try {
			getComponent();
		} catch (error) {
			message = error.message;
		}

		expect(message).toBe('getComponent method needs at least one key');
	});

	test('should throw an Error when there is not BlueBase context', () => {
		const Foo = getComponent('Foo');

		let message;
		try {
			TestRenderer.create(<Foo />);
		} catch (error) {
			message = error.message;
		}

		expect(message).toBe(
			'Could not resolve component "Foo" in "getComponent" command. Reason: BlueBase context not found.'
		);
	});
});
