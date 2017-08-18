/* @flow */

import { DOM, createElement } from 'react';

import { hasComponent, getComponent } from './ComponentRegistry';

export default class JsonToReact {
	parseSchema(schema) {
		if (schema === undefined || schema === null) {
			throw new Error(`schema cannot be ${schema}`);
		}
		let element = null;
		let elements = null;
		if (Array.isArray(schema)) {
			elements = this.parseSubSchemas(schema);
		} else {
			element = this.createComponent(schema);
		}
		return element || elements;
	}

	parseSubSchemas(subSchemas = []) {
		const Components = [];
		let index = 0;
		for (const subSchema of subSchemas) {
			subSchema.key = typeof subSchema.key !== 'undefined' ? subSchema.key : index;
			Components.push(this.parseSchema(subSchema));
			index++;
		}
		return Components;
	}

	createComponent(schema) {
		const { text, props } = schema;
		const Component = this.resolveComponent(schema);
		const Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
		return createElement(Component, props, Children);
	}

	resolveComponent(schema) {
		let Component = null;
		if (schema.hasOwnProperty('component')) {
			if (schema.component === Object(schema.component)) {
				Component = schema.component;
			} else if (hasComponent(schema.component)) {
				Component = getComponent(schema.component);
			} else if (DOM.hasOwnProperty(schema.component)) {
				Component = schema.component;
			}
		} else {
			throw new Error('JsonToReact could not resolve a component' +
			'due to a missing component attribute in the schema.');
		}
		return Component;
	}

	resolveComponentChildren(schema) {
		return (schema.hasOwnProperty('children')) ?
			this.parseSchema(schema.children) : undefined;
	}
}

/*
 * Helper method to convert a json object to React Component
 * @param {*} schema
 */
export const parseJsonSchema = (schema) => {
	const obj = new JsonToReact();
	return obj.parseSchema(schema);
};
