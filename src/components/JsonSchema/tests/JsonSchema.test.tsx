import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseProvider } from '../../../Context';
import { JsonSchema } from '../JsonSchema';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
BB.Components.register('Text', Native.Text);

describe('JsonSchema', () => {
	const JsonSchemaWithProvider = (props: any) => (
		<BlueBaseProvider value={BB}>
			<JsonSchema {...props}/>
		</BlueBaseProvider>
	);
	test(`Snapshot ComponentState component`, () => {
		const component = TestRenderer.create(
			<JsonSchemaWithProvider schema={{
				component: 'Text',
				props: {
					style: {
						color: 'red'
					}
				},
				text: 'This componenet is generated through JsonSchema Component',
			}}/>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
