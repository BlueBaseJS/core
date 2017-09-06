
import {
	DOM,
	createElement,
	isValidElement,
	type Element as ReactElement,
	type ElementType,
} from 'react';
import set from 'lodash.set';

import BR from '../index';

type ComponentSchema = {
	component: string | ReactElement<*>,
	text?: string,
	props?: {},
	children?: Array<ComponentSchema>
}

export default class JsonToReact {

	parseSchema(schema: ComponentSchema | Array<ComponentSchema>) : ReactElement<*> | Array<ReactElement<*>> | null {
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

	parseSubSchemas(subSchemas: Array<ComponentSchema> = []) : Array<any> /* cheated here */{
		const Components = [];
		let index = 0;
		for (const subSchema of subSchemas) {
			if (typeof subSchema.props === 'undefined' ) {
				set(subSchema, 'props.key', index);
			} else {
				subSchema.props.key = typeof subSchema.props.key !== 'undefined' ? subSchema.props.key : index;
			}
			const Component = this.parseSchema(subSchema);

			if (isValidElement(Component)) {
				Components.push(Component);
			}
			index += 1;
		}
		return Components;
	}

	createComponent(schema: ComponentSchema) : ReactElement<*> {
		const { text, props } = schema;
		if (Object.prototype.hasOwnProperty.call(schema, 'component') && typeof schema.component !== 'string' && isValidElement(schema.component)) {
			return schema.component;
		}
		const Component = JsonToReact.resolveComponent(schema);
		const Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
		return createElement(Component, props, Children);
	}

	static resolveComponent(schema: ComponentSchema) : ElementType<*> | string {
		if (Object.prototype.hasOwnProperty.call(schema, 'component')) {
			if (schema.component === Object(schema.component)) {
				return schema.component;
			} else if (BR.Components.has(String(schema.component))) {
				return BR.Components.get(String(schema.component));
			} else if (Object.prototype.hasOwnProperty.call(DOM, schema.component)) {
				return schema.component;
			}
		} else {
			throw new Error('JsonToReact could not resolve a component' +
			'due to a missing component attribute in the schema.');
		}

		throw new Error('JsonToReact could not resolve a component');
	}

	resolveComponentChildren(schema: ComponentSchema) {
		return (Object.prototype.hasOwnProperty.call(schema, 'children')) ?
			this.parseSchema(schema.children) : undefined;
	}
}

/*
 * Helper method to convert a json object to React Component
 * @param {*} schema
 */
export const parseJsonSchema = (schema: ComponentSchema) : ReactElement<*> | Array<ReactElement<*>> | null => {
	const obj = new JsonToReact();
	return obj.parseSchema(schema);
};
