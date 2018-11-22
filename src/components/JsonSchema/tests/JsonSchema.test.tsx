import { JsonSchema } from '../JsonSchema';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('JsonSchema', () => {
	const JsonSchemaWithProvider = (props: any) => (
		<WithProvider>
			<JsonSchema {...props}/>
		</WithProvider>
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
