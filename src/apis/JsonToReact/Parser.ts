/**
 * Initial code take from https://github.com/TechniqueSoftware/react-json-schema
 */
import { BlueRain } from '../../';
import DOM from 'react-dom-factories';
import React from 'react';

export interface JsonComponentSchema {
	component: string | React.ReactElement<any>;
	text?: string;
	props?: {
		key?: string;
		[key: string]: any;
	};
	children?: JsonComponentSchema[];
}

export default class JsonToReact {
	BR: BlueRain;

	constructor(ctx: BlueRain) {
		if (!ctx) {
			throw new Error('BlueRain context is required by JsonToReact class.');
		}

		this.BR = ctx;
	}

	parseSchema(
		schema: JsonComponentSchema | JsonComponentSchema[]
	): React.ReactElement<any> | Array<React.ReactElement<any>> {
		if (Array.isArray(schema)) {
			return this.parseSubSchemas(schema);
		}

		return this.createComponent(schema);
	}

	parseSubSchemas(subSchemas: JsonComponentSchema[] = []): Array<React.ReactElement<any>> {
		const Components: Array<React.ReactElement<any>> = [];
		let index = 0;
		for (const subSchema of subSchemas) {
			subSchema.props = subSchema.props ? subSchema.props : {};
			subSchema.props.key =
				typeof subSchema.props.key !== 'undefined' ? subSchema.props.key : String(index);
			const Component = this.parseSchema(subSchema) as React.ReactElement<any>;
			Components.push(Component);
			index++;
		}
		return Components;
	}

	createComponent(schema: JsonComponentSchema): React.ReactElement<any> {
		const { text, props } = schema;
		if (
			Object.prototype.hasOwnProperty.call(schema, 'component') &&
			typeof schema.component !== 'string' &&
			React.isValidElement(schema.component)
		) {
			return schema.component;
		}
		const Component = this.resolveComponent(schema);
		const Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
		return !Children
			? React.createElement(Component, props)
			: React.createElement(Component, props, Children);
	}

	resolveComponent(schema: JsonComponentSchema): React.ComponentType<any> {
		let Component;
		if (schema.hasOwnProperty('component')) {
			if (schema.component === Object(schema.component)) {
				Component = schema.component;
			} else if (this.BR.Components.has(String(schema.component))) {
				Component = this.BR.Components.get(String(schema.component));
			} else if (DOM.hasOwnProperty(schema.component as string)) {
				Component = schema.component;
			}
		} else {
			throw new Error(
				'ReactJsonSchema could not resolve a component due to a missing component attribute in the schema.'
			);
		}
		return Component;
	}

	resolveComponentChildren(
		schema: JsonComponentSchema
	): Array<React.ReactElement<any>> | undefined {
		if (schema.children && schema.hasOwnProperty('children')) {
			return this.parseSchema(schema.children) as Array<React.ReactElement<any>>;
		}

		return undefined;
	}
}
