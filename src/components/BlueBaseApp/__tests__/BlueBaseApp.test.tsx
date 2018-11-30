import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

describe('BlueBaseApp', () => {

	test(`Snapshot BlueBaseApp component`, () => {
		const component: any = TestRenderer.create(
			<BlueBaseApp />
		);
		component.getInstance().componentDidMount();
		// const tree = wrapper.toJSON();
		expect(component).toMatchSnapshot();
	});

	test(`Snapshot BlueBaseApp component after complete rendering`, (done: any) => {
		const component: any = TestRenderer.create(
			<BlueBaseApp />
		);
		setTimeout(() => {
			expect(component).toMatchSnapshot();
			done();
		});
	});
});
