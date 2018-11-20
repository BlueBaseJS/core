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

	it(`Snapshot PluginIcon component with no plugin registered`, async () => {

		try {
			const component = TestRenderer.create(
				<PluginIcon slug="dummy-plugin" />
			);
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
		} catch (e) {
			expect(e.message).toBe(`There's no pluign registered with "dummy-plugin" key in the registry.`);
		}
	});

	it(`Snapshot PluginIcon component with plugin registered with no icon`, async () => {
		await BB.Plugins.register({
			name: 'DummyPlugin',
			slug: 'dummy-plugin',
		});
		const component = TestRenderer.create(
			<PluginIcon slug="dummy-plugin" />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it(`Snapshot PluginIcon component with plugin registered with icon`, async () => {
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
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
