import { BlueBaseApp } from '../../BlueBaseApp';
import { JsonSchema } from '../JsonSchema';
import React from 'react';
import TestRenderer from 'react-test-renderer';

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


		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).props.style[1]).toMatchObject({
				color: 'red'
			});
			expect((tree as any).children.join()).toBe('This component is generated through JsonSchema Component');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render a text component with red color that is processed by filters`, (done) => {

		const filter = (schema: any, args: { style: any }) => ({
			...schema,
			props: {
				...schema.props,
				style: {
					...schema.props.style,
					...args.style,
				}
			},
			text: 'Content changed by filter!',
		});

		const component = TestRenderer.create(
			<BlueBaseApp filters={{ 'content-filter': filter }}>
				<JsonSchema
					filter="content-filter"
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
			expect((tree as any).props.style[1]).toMatchObject({
				color: 'blue'
			});
			expect((tree as any).children.join()).toBe('Content changed by filter!');
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
			expect((tree as any).children[0].children.join()).toBe('🚨 BlueBase Error');
			expect((tree as any).children[1].children.join())
				.toBe('Could not parse React JSON Schema. Reason: Could not resolve component.');
			done();
		});
	});

});
