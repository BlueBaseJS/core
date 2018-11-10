/**
 * Initial code take from https://github.com/TechniqueSoftware/react-json-schema
 */
import { MaybeArray } from '../../utils';
import React from 'react';
import isNil from 'lodash.isnil';
import isString from 'lodash.isstring';

export interface JsonComponentNode {
	component: string | React.ComponentType<any>;
	text?: string;
	props?: {
		key?: string;
		[key: string]: any;
	};
	children?: JsonComponentNode[];
	name?: string;
}

export type ResolveComponentFn = (node: JsonComponentNode) => (React.ComponentType<any> | null);

export class JsonSchemaParser {

	constructor(private getComponent: ResolveComponentFn = () => null) {
		//
	}

	parseSchema(schema: MaybeArray<JsonComponentNode>): MaybeArray<React.ReactElement<any>> {
		if (Array.isArray(schema)) {
			return this.parseSubSchemas(schema);
		}

		return this.createComponent(schema);
	}

	parseSubSchemas(subSchemas: JsonComponentNode[] = []): Array<React.ReactElement<any>> {
		const Components: Array<React.ReactElement<any>> = [];
		let index = 0;
		for (const subSchema of subSchemas) {
			subSchema.props = subSchema.props || {};
			subSchema.props.key = subSchema.props.key || String(index);
			const Component = this.parseSchema(subSchema) as React.ReactElement<any>;
			Components.push(Component);
			index++;
		}
		return Components;
	}

	createComponent(schema: JsonComponentNode): React.ReactElement<any> {
		const { text, props, component } = schema;

		if (isNil(component)) {
			throw Error(
				'Could not parse React JSON Schema. Reason: "component" property is required, but not given.'
			);
		}

		// // If schema.component is a React Component, return it
		// if (!isString(component) && React.isValidElement(component)) {
		// 	return component;
		// }

		const Component = this.resolveComponent(schema);
		const Children = text || this.resolveComponentChildren(schema);

		return React.createElement(Component, props, Children);
	}

	resolveComponent(node: JsonComponentNode): React.ComponentType<any> {

		// component is already a react component
		if (!isString(node.component) && node.component === Object(node.component)) {
			return node.component;
		}

		const Component = this.getComponent(node);

		if (Component) {
			return Component;
		}

		throw Error('Could not parse React JSON Schema. Reason: Could not resolve component.');
	}

	resolveComponentChildren({ children }: JsonComponentNode): MaybeArray<React.ReactElement<any>> | undefined {
		return !isNil(children) ? this.parseSchema(children) : undefined;
	}
}
