import * as Native from '../../../native';
import { BlueBaseApp } from '../../BlueBaseApp';
import React from 'react';
import { StatefulComponent } from '../StatefulComponent';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

describe('StatefulComponent', () => {
	const StatefulComponentWithProvider = (props: any) => (
		<BlueBaseApp>
			<StatefulComponent {...props} />
		</BlueBaseApp>
	);

	test(`Snapshot StatefulComponent component`, () => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot StatefulComponent component after complete render`, (done) => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot StatefulComponent component after complete render with child`, (done) => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider>
				<Native.Text>Hello</Native.Text>
			</StatefulComponentWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot StatefulComponent component after complete render with child, loading: true`, (done) => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider loading={true}>
				<Native.Text>Hello</Native.Text>
			</StatefulComponentWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot StatefulComponent component after complete render with child, isEmpty: () => true`, (done) => {
		const component = TestRenderer.create(
			<StatefulComponentWithProvider isEmpty={() => true} loading={true}>
				<Native.Text>Hello</Native.Text>
			</StatefulComponentWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot StatefulComponent component after complete render with child, isEmpty: () => true, Component`,
		(done) => {
			const Comp: React.ComponentType = () => (
				<Native.Text>Hello</Native.Text>
			);
			const component = TestRenderer.create(
				<StatefulComponentWithProvider
					component={Comp}
					isEmpty={() => true}
					loading={true}
					data={[1, 2]}
				/>
			);
			setTimeout(() => {
				const tree = component.toJSON();
				expect(tree).toMatchSnapshot();
				done();
			});
		});
});
