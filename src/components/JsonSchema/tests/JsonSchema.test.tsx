// import * as Component from '../..';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { JsonSchema } from '../JsonSchema';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
// BB.Components.register('View', Native.View);
BB.Components.register('Text', Native.Text);
// BB.Components.register('Image', Native.Image);
const mockContext = jest.fn();

jest.mock('../../../Context', () => ({
	BlueBaseConsumer: ({ children }: { children: any }) => children(BB)
}));

describe('JsonSchema', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});

	test(`Snapshot ComponentState component`, () => {
		const component = TestRenderer.create(
			<JsonSchema schema={{
				component: 'Text',
				props: {
					style: {
						color: 'red'
					}
				},
				text: 'This componenet is generated through JsonSchema Component',
			}}/>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});
});
