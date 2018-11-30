import { ErrorState } from '../ErrorState';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('ErrorState', () => {
	const ErrorStateWithProvider = (props: any) => (
		<WithProvider>
			<ErrorState {...props} />
		</WithProvider>
	);

	test(`Snapshot ErrorState`, () => {
		const component = TestRenderer.create(
			<ErrorStateWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ErrorState after complete rendering`, (done) => {
		const component = TestRenderer.create(
			<ErrorStateWithProvider />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
