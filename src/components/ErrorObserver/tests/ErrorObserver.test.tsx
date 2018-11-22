import * as Native from '../../../native';
import { ErrorObserver } from '../ErrorObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('ErrorObserver', () => {
	const ErrorObserverWithProvider = (props: any) => (
		<WithProvider>
			<ErrorObserver {...props}/>
		</WithProvider>
	);

	test(`Snapshot ErrorObserver`, () => {
		const component = TestRenderer.create(
			<ErrorObserverWithProvider>
				<Native.Text>Hello</Native.Text>
			</ErrorObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ErrorObserver with error`, () => {
		const component = TestRenderer.create(
			<ErrorObserverWithProvider error={{ name: '404', message: 'no page found' }}
				errorComponent={() => <Native.Text>Error</Native.Text>}>
				<Native.Text>Hello</Native.Text>
			</ErrorObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ErrorObserver with child as function`, () => {
		const component = TestRenderer.create(
			<ErrorObserverWithProvider>
				{
					() => <Native.Text>Hello</Native.Text>
				}
			</ErrorObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
