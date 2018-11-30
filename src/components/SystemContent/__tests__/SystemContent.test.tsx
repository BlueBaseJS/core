import React from 'react';
import { SystemContent } from '../SystemContent';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('SystemContent', () => {
	const SystemContentWithProvider = (props: any) => (
		<WithProvider>
			<SystemContent {...props} />
		</WithProvider>
	);

	test(`Snapshot SystemContent component`, () => {
		const component = TestRenderer.create(
			<SystemContentWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot SystemContent component after complete render`, (done) => {
		const component = TestRenderer.create(
			<SystemContentWithProvider />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});
});
