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

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
		expect((tree as any).children.join()).toBe('Loading');

		setTimeout(() => {
			tree = component.toJSON();
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

		let tree = component.toJSON();
		expect((tree as any).children.join()).toBe('Loading');
		expect(tree).toMatchSnapshot();

		setTimeout(() => {
			tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).children[0].type).toBe('View');
			done();
		});
	});

	test(`should throw an Error when no key is passed`, () => {

		try {
			getComponent();
		} catch (error) {
			expect(error.message).toBe('getComponent method needs at least one key');
		}

	});

});
