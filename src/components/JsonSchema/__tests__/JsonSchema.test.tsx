import { BlueBaseApp } from '../../BlueBaseApp';
import { JsonSchema } from '../JsonSchema';
import React from 'react';
import TestRenderer from 'react-test-renderer';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('JsonSchema', () => {

	test(`should render a text component with red color`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<JsonSchema schema={{
					component: 'Text',
					props: {
						style: {
							color: 'red'
						}
					},
					text: 'This component is generated through JsonSchema Component',
				}} />
			</BlueBaseApp>
		);
		let tree = component.toJSON();
		expect((tree as any).children.join()).toBe('Loading');
		expect(tree).toMatchSnapshot();


		setTimeout(() => {
			tree = component.toJSON();
			expect((tree as any).children[0].props.style[1]).toMatchObject({
				color: 'red'
			});
			expect((tree as any).children[0].children.join()).toBe('This component is generated through JsonSchema Component');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render a text component with red color that is processed by hooks`, (done) => {

		const hook = (schema: any, args: { style: any }) => ({
			...schema,
			props: {
				...schema.props,
				style: {
					...schema.props.style,
					...args.style,
				}
			},
			text: 'Content changed by hook!',
		});

		const component = TestRenderer.create(
			<BlueBaseApp hooks={{ 'content-hook': hook }}>
				<JsonSchema
					hook="content-hook"
					args={{ style: { color: 'blue' } }}
					schema={{
						component: 'Text',
						props: {
							style: {
								color: 'red'
							}
						},
						text: 'This component is generated through JsonSchema Component',
					}
				} />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).children[0].props.style[1]).toMatchObject({
				color: 'blue'
			});
			expect((tree as any).children[0].children.join()).toBe('Content changed by hook!');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render a null for unknown component`, (done) => {

		const component = TestRenderer.create(
			<BlueBaseApp>
				<JsonSchema schema={{
					component: 'Foo',
					text: 'This component is generated through JsonSchema Component',
				}} />
			</BlueBaseApp>
		);


		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).children.join())
				.toBe('Could not parse React JSON Schema. Reason: Could not resolve component.');
			done();
		});
	});

});
