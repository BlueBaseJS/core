import { JsonComponentNode, JsonSchemaParser } from '../../lib/json-schema-parser';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { BlueBaseHook } from '../BlueBaseHook';
import { MaybeArray } from '../../utils';
import React from 'react';

export interface JsonSchemaProps {
	schema: MaybeArray<JsonComponentNode>;
	hook?: string;
	args?: { [key: string]: any };
}

const getComponent = (BB: BlueBase) => {
	return ({ component }: JsonComponentNode) => {

		return BB.Components.has(String(component)) ? BB.Components.resolve(String(component)) : null;
	};
};

/**
 * 🍱 JsonSchema
 */
export class JsonSchema extends React.PureComponent<JsonSchemaProps> {

	static contextType = BlueBaseContext;

	render() {

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

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
