import * as Native from '../../../native';
import React from 'react';
import { StatefulComponent } from '../StatefulComponent';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('StatefulComponent', () => {
	const StatefulComponentWithProvider = (props: any) => (
		<WithProvider>
			<StatefulComponent {...props}/>
		</WithProvider>
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
				<Native.Text>Hello</Native.Text>
			</StatefulComponentWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child, loading: true`, () => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider loading={true}>
				<Native.Text>Hello</Native.Text>
			</StatefulComponentWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component with child, isEmpty: () => true`, () => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider isEmpty={() => true} loading={true}>
				<Native.Text>Hello</Native.Text>
			</StatefulComponentWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
