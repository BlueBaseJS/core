import { BlueBaseApp } from '../../../';
import { ErrorState } from '../ErrorState';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ErrorState', () => {
	test(`should render ErrorState`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorState />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ErrorState);

		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('title')
		).toBe('Something broke!');
		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('description')
		).toBe('An unknown error has occurred. Please try again later.');
	});

	test(`should render ErrorState with retry button and custom error`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<ErrorState
					retry={() => {
						return null;
					}}
					error={Error('Bang!')}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ErrorState);

		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('title')
		).toBe('Error');
		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('description')
		).toBe('Bang!');
		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('actionTitle')
		).toBe('Retry');
	});
});
