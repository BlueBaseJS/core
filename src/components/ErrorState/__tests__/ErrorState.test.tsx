import { BlueBaseApp } from '../../BlueBaseApp';
import { ErrorState } from '../ErrorState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('ErrorState', () => {

	test(`should render ErrorState`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<ErrorState />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).children[0].children.join()).toBe('Something broke!');
			expect((tree as any).children[1].children.join())
				.toBe('An unknown error has occured. Please try again later.');
			done();
		});
	});

	test(`should render ErrorState with retry button and custom error`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<ErrorState retry={() => { return null; }} error={Error('Bang!')} />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).children[0].children.join()).toBe('Error');
			expect((tree as any).children[1].children.join()).toBe('Bang!');
			expect((tree as any).children[2].type).toBe('View'); // Button
			done();
		});
	});

});
