import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

describe('BlueBaseApp', () => {

	test(`Snapshot BlueBaseApp component`, () => {
		const component = TestRenderer.create(
			<BlueBaseApp/>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
