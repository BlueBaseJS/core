import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

describe('BlueBaseApp', () => {

	test(`should render BlueBaseApp`, (done: any) => {
		const rendered: any = TestRenderer.create(<BlueBaseApp />);

		// Will show loading
		expect(rendered.toJSON().children.join()).toBe('Loading');
		expect(rendered).toMatchSnapshot();

		// After loading
		setTimeout(() => {
			expect(rendered).toMatchSnapshot();
			done();
		});
	});
});
