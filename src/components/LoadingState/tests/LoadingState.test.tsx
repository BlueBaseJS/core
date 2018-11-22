import * as Native from '../../../native';
import { LoadingState } from '../LoadingState';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('LoadingState', () => {
	const LoadingStateWithProvider = (props: any) => (
		<WithProvider>
			<LoadingState {...props}/>
		</WithProvider>
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
