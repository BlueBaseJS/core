import * as Component from '../..';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import React from 'react';
import { StatefulComponent } from '../StatefulComponent';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
// BB.boot();

const mockContext = jest.fn();

jest.mock('../../../Context', () => ({
	BlueBaseConsumer: ({ children }: { children: any }) => children(BB)
}));

describe('StatefulComponent', () => {
	beforeEach(async () => {
		await BB.Components.register('ComponentState', Component.ComponentState);
		await BB.Components.register('View', Native.View);
		await BB.Components.register('Text', Native.Text);
		await BB.Components.register('Image', Native.Image);
		await BB.Components.register('ErrorObserver', Component.ErrorObserver);
		await BB.Components.register('DataObserver', Component.DataObserver);
		await BB.Components.register('ErrorState', Component.ErrorState);
		await BB.Components.register('WaitObserver', Component.WaitObserver);
		await BB.Components.register('LoadingState', Component.LoadingState);
		await BB.Components.register('EmptyState', Component.EmptyState);
		mockContext.mockReset();
	});

	test(`Snapshot StatefulComponent component`, () => {
		const component = TestRenderer.create(
			<StatefulComponent />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child`, () => {
		const component = TestRenderer.create(
			<StatefulComponent>
				<BB.Components.Text>Hello</BB.Components.Text>
			</StatefulComponent>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child, loading: true`, () => {
		const component = TestRenderer.create(
			<StatefulComponent loading={true}>
				<BB.Components.Text>Hello</BB.Components.Text>
			</StatefulComponent>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child, isEmpty: () => true`, () => {
		const component = TestRenderer.create(
			<StatefulComponent isEmpty={() => true} loading={true}>
				<BB.Components.Text>Hello</BB.Components.Text>
			</StatefulComponent>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
