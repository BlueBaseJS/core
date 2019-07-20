import { BlueBaseApp } from '../../../';
import { LoadingState } from '../LoadingState';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';


describe('LoadingState', () => {

	test(`should render an ActivityIndicator`, async () => {
		const component = mount(
			<BlueBaseApp>
				<LoadingState />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, LoadingState);
		// expect(component).toMatchSnapshot();

		expect(component.exists('LoadingState ActivityIndicator')).toBe(true);
		expect(component.exists('LoadingState Body2')).toBe(false);
		expect(component.exists('LoadingState Button')).toBe(false);

	});

	test(`should render timeout message`, async () => {
		const component = mount(
			<BlueBaseApp>
				<LoadingState timedOut={true} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, LoadingState);
		// expect(component).toMatchSnapshot();

		expect(component.exists('LoadingState ActivityIndicator')).toBe(true);
		expect(component.exists('LoadingState Body2')).toBe(true);
		expect(component.find('LoadingState Body2 Text').last().text()).toBe('This is taking longer than usual');
		expect(component.exists('LoadingState Button')).toBe(false);
	});

	test(`should render timeout message & retry button`, async () => {
		const mockedFn = jest.fn();

		const component = mount(
			<BlueBaseApp>
				<LoadingState timedOut={true} retry={mockedFn} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(component as any, LoadingState);
		// expect(component).toMatchSnapshot();

		expect(component.exists('LoadingState ActivityIndicator')).toBe(true);
		expect(component.exists('LoadingState Body2')).toBe(true);
		expect(component.find('LoadingState Body2 Text').last().text()).toBe('This is taking longer than usual');
		expect(component.exists('LoadingState Button')).toBe(true);

		(component as any).find('LoadingState Button').first().props().onPress();
		expect(mockedFn.mock.calls.length).toBe(1);
	});

});
