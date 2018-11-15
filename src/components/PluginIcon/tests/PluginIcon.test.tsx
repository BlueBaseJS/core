import * as Component from '../..';
import { BlueBase } from '../../../BlueBase';
import { PluginIcon } from '../PluginIcon';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const mockContext = jest.fn();
const BB = new BlueBase();

jest.mock('../../../Context', () => ({
	BlueBaseConsumer: ({ children }: { children: any }) => children(BB)
}));

describe('PluginIcon', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});
	it(`Snapshot PluginIcon component`, async () => {
		await BB.Components.register('DynamicIcon', Component.DynamicIcon);
		await BB.Plugins.register({
			icon: {
				source: '',
				type: 'image',
			},
			name: 'DummyPlugin',
			slug: 'dummy-plugin',
		});
		const component = TestRenderer.create(
			<PluginIcon slug="dummy-plugin" />
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

});
