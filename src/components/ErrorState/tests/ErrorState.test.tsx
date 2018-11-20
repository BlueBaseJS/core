import * as Component from '../..';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseProvider } from '../../../Context';
import { ErrorState } from '../ErrorState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
BB.Components.register('Text', Native.Text);
BB.Components.register('View', Native.View);
BB.Components.register('ComponentState', Component.ComponentState);

describe('ErrorState', () => {
	const ErrorStateWithProvider = (props: any) => (
		<BlueBaseProvider value={BB}>
			<ErrorState {...props} />
		</BlueBaseProvider>
	);

	test(`Snapshot ErrorState`, () => {
		const component = TestRenderer.create(
			<ErrorStateWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
