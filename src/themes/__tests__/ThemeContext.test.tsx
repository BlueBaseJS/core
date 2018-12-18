import { BlueBaseApp } from '../../index';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeDemo } from '../__stories__/ThemeDemo';

beforeEach(() => {
	jest.resetModules();
});

describe('ThemeContext', () => {

	test(`should render a text component with red color`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<ThemeDemo />
			</BlueBaseApp>
		);
		let tree = component.toJSON();
		expect((tree as any).children.join()).toBe('Loading');
		expect(tree).toMatchSnapshot();


		setTimeout(() => {
			tree = component.toJSON();
			// expect((tree as any).children[0].props.style[1]).toMatchObject({
			// 	color: 'red'
			// });
			// expect((tree as any).children[0].children.join()).toBe('This component is generated through JsonSchema Component');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
