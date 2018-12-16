// import * as Native from '../../../native';
import { BlueBaseApp } from '../../BlueBaseApp';
import { LoadingState } from '../LoadingState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

describe('LoadingState', () => {
	const LoadingStateWithProvider = (props: any) => (
		<BlueBaseApp>
			<LoadingState {...props} />
		</BlueBaseApp>
	);

	test(`Snapshot LoadingState component`, () => {
		const component = TestRenderer.create(
			<LoadingStateWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot LoadingState component after complete rendering`, (done) => {
		const component = TestRenderer.create(
			<LoadingStateWithProvider />
		);
		setTimeout(() => {
			const tree: any = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot LoadingState component after complete rendering with timedOut: true`, (done) => {
		const component = TestRenderer.create(
			<LoadingStateWithProvider timedOut={true} />
		);
		setTimeout(() => {
			const tree: any = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot LoadingState component after complete rendering with timedOut: false`, (done) => {

		const component = TestRenderer.create(
			<LoadingStateWithProvider timedOut={false} />
		);
		setTimeout(() => {
			const tree: any = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot LoadingState component after complete rendering with timedOut: true and retry mocked function`,
		(done) => {
			const mockedFn = jest.fn();
			const component = TestRenderer.create(
				<LoadingStateWithProvider timedOut={true} retry={mockedFn} />
			);
			setTimeout(() => {
				const tree: any = component.toJSON();
				expect(tree).toMatchSnapshot();
				done();
			});
		});
});
