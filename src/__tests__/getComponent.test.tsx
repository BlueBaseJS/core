import { BlueBaseApp } from '../components/';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { getComponent } from '../getComponent';

describe('getComponent', () => {

	test(`should render a text component`, (done) => {
		const Text = getComponent('Text');

		const component = TestRenderer.create(
			<BlueBaseApp>
				<Text>A Text component</Text>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).type).toBe('Text');
			expect((tree as any).children.join()).toBe('A Text component');
			done();
		});
	});

	test(`should render a button component`, (done) => {

		const Button = getComponent('Button');

		const component = TestRenderer.create(
			<BlueBaseApp>
				<Button>A Button component</Button>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).children[0].type).toBe('View');
			done();
		});
	});

	test(`should throw an Error when no key is passed`, () => {

		let message;

		try {
			getComponent();
		} catch (error) {
			message = error.message;
		}

		expect(message).toBe('getComponent method needs at least one key');
	});

	// test(`should throw an Error when there is not BlueBase context`, () => {

	// 	const Foo = getComponent('Foo');

	// 	let message;
	// 	try {
	// 		TestRenderer.create(<Foo />);
	// 	} catch (error) {
	// 		message = error.message;
	// 	}

	// 	expect(message)
	// 	.toBe('Could not resolve component in "getComponent" command. Reason: BlueBase context not found.');
	// });

});
