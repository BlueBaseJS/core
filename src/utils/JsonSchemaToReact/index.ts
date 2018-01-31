import {
	// DOM,
	createElement,
	isValidElement,
	ReactElement
} from 'react';
import set from 'lodash.set';

import DOM from './dom';
import BR from '../../index';

export interface JsonComponentSchema {
	component: string | ReactElement<any>;
	text?: string;
	props?: { [key: string]: any };
	children?: JsonComponentSchema[];
}

export default class JsonToReact {
	resolveComponent(schema: JsonComponentSchema): any | string {
		if (Object.prototype.hasOwnProperty.call(schema, 'component')) {
			if (schema.component === Object(schema.component)) {
				return schema.component;
			} else if (BR && BR.Components.has(String(schema.component))) {
				return BR.Components.get(String(schema.component));
			} else if (DOM.indexOf(schema.component) > -1) {
				return schema.component;
			}
			// Discontinuing this because `import DOM from 'react';` now returns undefiend.
			// else if (Object.prototype.hasOwnProperty.call(DOM, schema.component)) {
			// 	return schema.component;
			// }
		} else {
			throw new Error(
				'JsonToReact could not resolve a component' +
					'due to a missing component attribute in the schema.'
			);
		}

		throw new Error(`JsonToReact could not resolve a component: ${schema.component}`);
	}

	parseSchema(
		schema: JsonComponentSchema | JsonComponentSchema[]
	): ReactElement<any> | Array<ReactElement<any>> | null {
		if (schema === undefined || schema === null) {
			throw new Error(`schema cannot be ${schema}`);
		}
		let element: ReactElement<any> | null = null;
		let elements: Array<ReactElement<any>> | null = null;
		if (Array.isArray(schema)) {
			elements = this.parseSubSchemas(schema);
		} else {
			element = this.createComponent(schema);
		}
		return element || elements;
	}

	parseSubSchemas(subSchemas: JsonComponentSchema[] = []): any[] /* cheated here */ {
		const Components: any[] = [];
		let index = 0;
		for (const subSchema of subSchemas) {
			if (typeof subSchema.props === 'undefined') {
				set(subSchema, 'props.key', index);
			} else {
				subSchema.props.key =
					typeof subSchema.props.key !== 'undefined' ? subSchema.props.key : index;
			}
			const Component = this.parseSchema(subSchema);

			if (isValidElement(Component)) {
				Components.push(Component);
			}
			index += 1;
		}
		return Components;
	}

	createComponent(schema: JsonComponentSchema): ReactElement<any> {
		const { text, props } = schema;
		if (
			Object.prototype.hasOwnProperty.call(schema, 'component') &&
			typeof schema.component !== 'string' &&
			isValidElement(schema.component)
		) {
			return schema.component;
		}
		const Component = this.resolveComponent(schema);
		const Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
		return createElement(Component, props, Children);
	}

	resolveComponentChildren(schema: JsonComponentSchema) {
		return schema.children ? this.parseSchema(schema.children) : undefined;
	}
}

/*
 * Helper method to convert a json object to React Component
 * @param {*} schema
 */
export const parseJsonSchema = (
	schema: JsonComponentSchema
): ReactElement<any> | Array<ReactElement<any>> | null => {
	const obj = new JsonToReact();
	return obj.parseSchema(schema);
};
