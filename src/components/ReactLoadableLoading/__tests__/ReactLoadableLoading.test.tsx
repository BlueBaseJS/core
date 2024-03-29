import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import { BlueBaseApp } from '../../../';
import { ReactLoadableLoading } from '../ReactLoadableLoading';

describe('ReactLoadableLoading', () => {
	test('should show loading state with timeout if isloading = true, pastDelay = true & timedOut = true', async () => {
		const component = mount(
			<BlueBaseApp>
				<ReactLoadableLoading
					isLoading
					pastDelay
					timedOut
					error={Error('Random Error')}
					retry={() => {
						return;
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(component as any, ReactLoadableLoading);

		expect(component.exists('ErrorState')).toBe(true);
		expect(
			component
				.find('ErrorState Body2 Text')
				.last()
				.text()
		).toBe('Random Error');
	});

	test('should show loading state if isloading = true & pastDelay = true', async () => {
		const component = mount(
			<BlueBaseApp>
				<ReactLoadableLoading
					isLoading
					pastDelay
					timedOut={false}
					error={false}
					retry={() => {
						return;
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(component as any, ReactLoadableLoading);

		expect(component.exists('LoadingState')).toBe(true);
		expect(component.find('LoadingState').exists('ActivityIndicator')).toBe(true);
	});

	test('should show loading state with timeout if isloading = true, pastDelay = true & timedOut = true', async () => {
		const component = mount(
			<BlueBaseApp>
				<ReactLoadableLoading
					isLoading
					pastDelay
					timedOut
					error={false}
					retry={() => {
						return;
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(component as any, ReactLoadableLoading);

		expect(component.exists('LoadingState')).toBe(true);
		expect(component.find('LoadingState').exists('ActivityIndicator')).toBe(true);
		expect(
			component
				.find('LoadingState Body2 Text')
				.last()
				.text()
		).toBe('This is taking longer than usual');
	});

	test('should show null if isloading = true & pastDelay = false', async () => {
		const component = mount(
			<BlueBaseApp>
				<ReactLoadableLoading
					isLoading
					pastDelay={false}
					timedOut={false}
					error={false}
					retry={() => {
						return;
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(component as any, ReactLoadableLoading);

		expect(component.find('ReactLoadableLoading').children()).toHaveLength(0);
	});

	test('should show null if everything is false', async () => {
		const component = mount(
			<BlueBaseApp>
				<ReactLoadableLoading
					isLoading={false}
					pastDelay={false}
					timedOut={false}
					error={false}
					retry={() => {
						return;
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(component as any, ReactLoadableLoading);

		expect(component.find('ReactLoadableLoading').children()).toHaveLength(0);
	});
});
