import { JsonComponentNode, JsonSchemaParser } from '../../lib/json-schema-parser';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { BlueBaseHook } from '../../index';
import { MaybeArray } from '../../utils';
import React from 'react';

export interface JsonSchemaProps {

	/** JSON Schema. */
	schema: MaybeArray<JsonComponentNode>;

	/** Event name to hook this schema. If this is not provided, the schema is not hooked. */
	hook?: string;

	/** Arguments for the hook. */
	args?: { [key: string]: any };
}

const getComponent = (BB: BlueBase) => {
	return ({ component }: JsonComponentNode) => {

		return BB.Components.has(String(component)) ? BB.Components.resolve(String(component)) : null;
	};
};

/**
 * # 🍱 JsonSchema
 *
 * Renders a Component based on JSON schema. This allows developers to create dynamic
 * layouts in their apps, and even save the schema to databases.
 *
 * Moreover, it also makes that schema hookable. So that any plugin can modify that schema
 * on runtime.
 *
 * ## Usage:
 * ```jsx
 * <JsonSchema
 * 	hook="content-hook"
 * 	args={{ style: { color: 'blue' } }}
 *  schema={{
 * 	 component: 'Text',
 * 	 props: {
 * 		 style: {
 * 			 color: 'red'
 * 		 }
 * 	 },
 * 	 text: 'This is the page content.',
 *  }
 * } />
 * ```
 */
export class JsonSchema extends React.PureComponent<JsonSchemaProps> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		const { hook, schema, args } = this.props;
		const parser = new JsonSchemaParser(getComponent(BB));

		// There's no hook, we don't need to do complex async handling
		if (!hook) {
			return parser.parseSchema(schema);
		}

		return (
			<BlueBaseHook hook={hook} value={schema} args={args} children={(loadedSchema) => parser.parseSchema(loadedSchema)} />
		);
	}
}
