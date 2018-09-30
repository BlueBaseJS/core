import { JsonComponentNode, JsonSchemaParser } from '../../lib/json-schema-parser';
import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';
import { MaybeArray } from '../../utils';
import React from 'react';
import isString from 'lodash.isstring';
import { BlueRainHook } from '../BlueRainHook';

export interface JsonSchemaProperties {
	schema: MaybeArray<JsonComponentNode>;
	hook?: string;
	args?: { [key: string]: any };
}

const getComponent = (BR: BlueRain) => {
	return ({ component }: JsonComponentNode) => {

		if (!isString(component)) {
			return null;
		}

		return BR.Components.has(component) ? BR.Components.resolve(component) : null;
	};
};


// export const JsonSchema = ({ hook, schema }: JsonSchemaProperties) => (
// 	<BlueRainConsumer>
// 		{(BR: BlueRain) => {

// 			const AsyncJsonSchema = Loadable({
// 				loader: () => hook ? BR.Hooks.run(hook, schema) : Promise.resolve(schema),
// 				loading: () => <Text>Loading</Text>,
// 				render(loadedSchema: JsonSchemaProperties['schema']) {
// 					return (new JsonSchemaParser(getComponent(BR))).parseSchema(loadedSchema);
// 				}
// 			});

// 			return <AsyncJsonSchema />;

// 		}}
// 	</BlueRainConsumer>
// );


export class JsonSchema extends React.PureComponent<JsonSchemaProperties> {

	render() {
		const { hook, schema, args } = this.props;

		return (
			<BlueRainConsumer children={(BR: BlueRain) => {

				const parser = new JsonSchemaParser(getComponent(BR));

				// There's no hook, we don't need to do complex asyn handling
				if (!hook) {
					return parser.parseSchema(schema);
				}

				return (
					<BlueRainHook hook={hook} value={schema} args={args} children={(loadedSchema) => {
						return parser.parseSchema(loadedSchema);
					}} />
				);

			}} />
		);
	}
}
