import { BlueBaseApp } from '../../BlueBaseApp';
import React from 'react';
import { SystemApp } from '../SystemApp';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

describe('SystemApp', () => {
	const SystemAppWithProvider = (props: any) => (
		<BlueBaseApp>
			<SystemApp {...props} />
		</BlueBaseApp>
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
