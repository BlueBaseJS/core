import * as Native from '../../../native';
import { Text, View } from 'react-native';
import { BlueBaseApp } from '../../BlueBaseApp';
import { DataObserver } from '../DataObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('DataObserver', () => {
	const DataObserverWithProvider = (props: any) => (
		<BlueBaseApp>
			<DataObserver {...props} />
		</BlueBaseApp>
	);

	test(`Snapshot DataObserver component with Text`, (done) => {
		const component = TestRenderer.create(
			<DataObserverWithProvider>
				<Native.Text>hello</Native.Text>
			</DataObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should generate states from custom listener functions`, (done) => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data="foo" isEmpty={() => false} isLoading={() => true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
			</DataObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).children[0].children.join()).toBe('foo');
			expect((tree as any).children[1].children.join()).toBe('false');
			expect((tree as any).children[2].children.join()).toBe('true');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should set loading to true`, (done) => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data="foo" loading={true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
			</DataObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).children[0].children.join()).toBe('foo');
			expect((tree as any).children[1].children.join()).toBe('false');
			expect((tree as any).children[2].children.join()).toBe('true');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should set empty to true if data if an empty array`, (done) => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data={[]} loading={true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
			</DataObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).children[0].children).toBe(null);
			expect((tree as any).children[1].children.join()).toBe('true');
			expect((tree as any).children[2].children.join()).toBe('true');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should set empty to false if data if an array`, (done) => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data={['a']} loading={true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{(data as any).join()}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
			</DataObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).children[0].children.join()).toBe('a');
			expect((tree as any).children[1].children.join()).toBe('false');
			expect((tree as any).children[2].children.join()).toBe('true');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should set empty and loading to false when there are no listener functions`, (done) => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data="a" isEmpty={null} isLoading={null}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
			</DataObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).children[0].children.join()).toBe('a');
			expect((tree as any).children[1].children.join()).toBe('false');
			expect((tree as any).children[2].children.join()).toBe('false');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should set loading to false, if loading prop is not a boolean`, (done) => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data="a" loading="true">
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
			</DataObserverWithProvider>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect((tree as any).children[0].children.join()).toBe('a');
			expect((tree as any).children[1].children.join()).toBe('false');
			expect((tree as any).children[2].children.join()).toBe('false');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
