import { BlueBaseApp } from '../../../';
import { HomeScreen } from '../HomeScreen';
import React from 'react';
import TestRenderer from 'react-test-renderer';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('HomeScreen', () => {
	test(`Snapshot HomeScreen`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<HomeScreen/>
			</BlueBaseApp>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
