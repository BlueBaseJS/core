import * as Component from '../../../components';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseProvider } from '../../../Context';
import { EmptyState } from '../EmptyState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
BB.Components.register('View', Native.View);
BB.Components.register('Text', Native.Text);
BB.Components.register('Image', Native.Image);
BB.Components.register('ComponentState', Component.ComponentState);

describe('EmptyState', () => {
	const EmptyStateWithProvider = (props: any) => (
		<BlueBaseProvider value={BB}>
			<EmptyState {...props}/>
		</BlueBaseProvider>
	);
	test(`Snapshot EmptyState`, () => {
		const component = TestRenderer.create(
			<EmptyStateWithProvider/>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
