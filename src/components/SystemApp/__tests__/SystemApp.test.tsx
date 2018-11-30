import React from 'react';
import { SystemApp } from '../SystemApp';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('SystemApp', () => {
	const SystemAppWithProvider = (props: any) => (
		<WithProvider>
			<SystemApp {...props} />
		</WithProvider>
	);

	test(`Snapshot SystemApp component`, () => {
		const component = TestRenderer.create(
			<SystemAppWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot SystemApp component after complete render`, (done) => {
		const component = TestRenderer.create(
			<SystemAppWithProvider />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});
});
