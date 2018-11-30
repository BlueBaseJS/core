import { EmptyState } from '../EmptyState';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('EmptyState', () => {
	test(`Snapshot EmptyState`, (done) => {
		const component = TestRenderer.create(
			<WithProvider>
				<EmptyState/>
			</WithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
