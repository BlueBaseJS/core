import * as Native from '../../../native';
import { Text, View } from 'react-native';
import { BlueBaseApp } from '../../../';
import { DataObserver } from '../DataObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('DataObserver', () => {

	test(`Snapshot DataObserver component with Text`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<DataObserver>
					<Native.Text>hello</Native.Text>

				</DataObserver>
			</BlueBaseApp>
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should generate states from custom listener functions`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<DataObserver data="foo" isEmpty={() => false} isLoading={() => true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
				</DataObserver>
			</BlueBaseApp>
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
			<BlueBaseApp>
				<DataObserver data="foo" loading={true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
				</DataObserver>
			</BlueBaseApp>
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
			<BlueBaseApp>
				<DataObserver data={[]} loading={true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
				</DataObserver>
			</BlueBaseApp>
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
			<BlueBaseApp>
				<DataObserver data={['a']} loading={true}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{(data as any).join()}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
				</DataObserver>
			</BlueBaseApp>
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
			<BlueBaseApp>
				<DataObserver data="a" isEmpty={null as any} isLoading={null as any}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
				</DataObserver>
			</BlueBaseApp>
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
			<BlueBaseApp>
				<DataObserver data="a" loading={'true' as any}>
				{({ data, empty, loading }: { data: string, empty: boolean, loading: boolean }) => {
					return (
						<View>
							<Text>{data}</Text>
							<Text>{String(empty)}</Text>
							<Text>{String(loading)}</Text>
						</View>
					);
				}}
				</DataObserver>
			</BlueBaseApp>
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
