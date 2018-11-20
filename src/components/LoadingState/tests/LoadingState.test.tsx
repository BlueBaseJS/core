import * as Component from '../..';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseProvider } from '../../../Context';
import { LoadingState } from '../LoadingState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
BB.Components.register('ComponentState', Component.ComponentState);
BB.Components.register('View', Native.View);
BB.Components.register('Text', Native.Text);
BB.Components.register('ErrorObserver', Component.ErrorObserver);
BB.Components.register('DataObserver', Component.DataObserver);
BB.Components.register('ErrorState', Component.ErrorState);
BB.Components.register('ActivityIndicator', Native.ActivityIndicator);
BB.Components.register('Button', Native.Button);

describe('LoadingState', () => {
	const LoadingStateWithProvider = (props: any) => (
		<BlueBaseProvider value={BB}>
			<LoadingState {...props}/>
		</BlueBaseProvider>
	);

	test(`Snapshot LoadingState component`, () => {
		const component = TestRenderer.create(
			<LoadingStateWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot LoadingState component with timedOut: true`, () => {
		const component = TestRenderer.create(
			<LoadingStateWithProvider timedOut={true} />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot LoadingState component with timedOut: false`, () => {

		const component = TestRenderer.create(
			<LoadingStateWithProvider timedOut={false} />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot LoadingState component with timedOut: true and retry mocked function`, () => {
		const mockedFn = jest.fn();
		const component = TestRenderer.create(
			<LoadingStateWithProvider timedOut={true} retry={mockedFn} />
		);
		component.root.findByType(Native.Button).props.onPress();
		const tree: any = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
