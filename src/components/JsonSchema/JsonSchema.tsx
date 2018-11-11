import { JsonComponentNode, JsonSchemaParser } from '../../lib/json-schema-parser';
import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import { BlueBaseHook } from '../BlueBaseHook';
import { MaybeArray } from '../../utils';
import React from 'react';
import isString from 'lodash.isstring';

export interface JsonSchemaProps {
	schema: MaybeArray<JsonComponentNode>;
	hook?: string;
	args?: { [key: string]: any };
}

const getComponent = (BB: BlueBase) => {
	return ({ component }: JsonComponentNode) => {

		if (!isString(component)) {
			return null;
		}

		return BB.Components.has(component) ? BB.Components.resolve(component) : null;
	};
};


// export const JsonSchema = ({ hook, schema }: JsonSchemaProperties) => (
// 	<BlueBaseConsumer>
// 		{(BB: BlueBase) => {

// 			const AsyncJsonSchema = Loadable({
// 				loader: () => hook ? BB.Hooks.run(hook, schema) : Promise.resolve(schema),
// 				loading: () => <Text>Loading</Text>,
// 				render(loadedSchema: JsonSchemaProperties['schema']) {
// 					return (new JsonSchemaParser(getComponent(BB))).parseSchema(loadedSchema);
// 				}
// 			});

// 			return <AsyncJsonSchema />;

// 		}}
// 	</BlueBaseConsumer>
// );


export class JsonSchema extends React.PureComponent<JsonSchemaProps> {

	render() {
		const { hook, schema, args } = this.props;

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => {

				const parser = new JsonSchemaParser(getComponent(BB));

				// There's no hook, we don't need to do complex asyn handling
				if (!hook) {
					return parser.parseSchema(schema);
				}

				return (
					<BlueBaseHook hook={hook} value={schema} args={args} children={(loadedSchema) => {
						return parser.parseSchema(loadedSchema);
					}} />
				);

			}} />
		);
	}
}
