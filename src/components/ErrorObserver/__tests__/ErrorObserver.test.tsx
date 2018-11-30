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

	test(`Snapshot ErrorObserver after complete rendering`, (done) => {
		const component = TestRenderer.create(
			<ErrorObserverWithProvider>
				<Native.Text>Hello</Native.Text>
			</ErrorObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ErrorObserver after complete rendering with error`, (done) => {
		const component = TestRenderer.create(
			<ErrorObserverWithProvider error={{ name: '404', message: 'no page found' }}
				errorComponent={() => <Native.Text>Error</Native.Text>}>
				<Native.Text>Hello</Native.Text>
			</ErrorObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ErrorObserver after complete rendering with child as function`, (done) => {
		const component = TestRenderer.create(
			<ErrorObserverWithProvider>
				{
					() => <Native.Text>Hello</Native.Text>
				}
			</ErrorObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
