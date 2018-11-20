import * as Component from '../..';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseProvider } from '../../../Context';
import React from 'react';
import { StatefulComponent } from '../StatefulComponent';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
BB.Components.register('ComponentState', Component.ComponentState);
BB.Components.register('View', Native.View);
BB.Components.register('Text', Native.Text);
BB.Components.register('ErrorObserver', Component.ErrorObserver);
BB.Components.register('DataObserver', Component.DataObserver);
BB.Components.register('ErrorState', Component.ErrorState);

describe('StatefulComponent', () => {
	const StatefulComponentWithProvider = (props: any) => (
		<BlueBaseProvider value={BB}>
			<StatefulComponent {...props}/>
		</BlueBaseProvider>
	);

	test(`Snapshot StatefulComponent component`, () => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child`, () => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider>
				<BB.Components.Text>Hello</BB.Components.Text>
			</StatefulComponentWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child, loading: true`, () => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider loading={true}>
				<BB.Components.Text>Hello</BB.Components.Text>
			</StatefulComponentWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child, isEmpty: () => true`, () => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider isEmpty={() => true} loading={true}>
				<BB.Components.Text>Hello</BB.Components.Text>
			</StatefulComponentWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
