import { BlueBaseApp } from '../../BlueBaseApp';
import { EmptyState } from '../EmptyState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('EmptyState', () => {
	test(`Snapshot EmptyState`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<EmptyState/>
			</BlueBaseApp>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
