import { JsonComponentNode, JsonSchemaParser } from '../JsonSchemaParser';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

const Timeline = ({ children, ...rest }: any) => <Text {...rest}>Timeline: {children}</Text>;
const Post = ({ content, ...rest }: any) => <Text {...rest}>Post: {content}</Text>;

describe('JsonSchemaParser', () => {

	it('should parse schema with a single component', () => {

		const parser = new JsonSchemaParser();
		const result = parser.parseSchema({
			component: Timeline,
		});

		const tree = renderer.create(result as React.ReactElement<any>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should parse schema with a single component with props', () => {

		const parser = new JsonSchemaParser();
		const result = parser.parseSchema({
			component: Timeline,
			props: {
				style: {
					color: 'red'
				}
			}
		});

		const tree = renderer.create(result as React.ReactElement<any>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should parse schema with a single component with text', () => {

		const parser = new JsonSchemaParser();
		const result = parser.parseSchema({
			component: Timeline,
			text: 'Hello',
		});

		const tree = renderer.create(result as React.ReactElement<any>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should parse schema with a single component with children', () => {

		const parser = new JsonSchemaParser();
		const result = parser.parseSchema({
			component: Timeline,
			children: [{
				component: Post,
				props: { content: 'Hello' }
			}, {
				component: Post,
				props: { content: 'World' }
			}, {
				component: Post,
			}]
		});

		const tree = renderer.create(result as React.ReactElement<any>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should parse schema with custom component lookup', () => {

		const parser = new JsonSchemaParser((node: JsonComponentNode) => {
			return (node.component === 'Post') ? Post : null;
		});
		const result = parser.parseSchema({
			component: 'Post',
		});

		const tree = renderer.create(result as React.ReactElement<any>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should throw error with undefined component', () => {

		const parser = new JsonSchemaParser();
		const result = () => parser.parseSchema({
			component: undefined as any,
		});

		expect(result).toThrow();
	});

	it('should throw error with unknown component', () => {

		const parser = new JsonSchemaParser();
		const result = () => parser.parseSchema({
			component: 'Foo',
		});

		expect(result).toThrow();
	});

});