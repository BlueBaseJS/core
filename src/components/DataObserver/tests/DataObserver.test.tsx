import * as Component from '../../../components';
import * as Native from '../../../native';
import { DataObserver } from '../DataObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});

describe('DataObserver', () => {
	const DataObserverWithProvider = (props: any) => (
		<WithProvider>
			<DataObserver {...props} />
		</WithProvider>
	);

	test(`Snapshot DataObserver component with Text`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider>
				<Native.Text>hello</Native.Text>
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => false} isLoading={() => true}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider isEmpty={() => false} isLoading={() => true}>
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => true} isLoading={() => false}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider isEmpty={() => true} isLoading={() => false}>
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => false} isLoading={() => false}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider isEmpty={() => false} isLoading={() => false}>
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => false} loading={true}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider isEmpty={() => false} loading={true}>
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component data={[]}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data={[]} >
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component data={['a', 'b']}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider data={['a', 'b']} >
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component loading={true}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider loading={true} >
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component loading={true}`, () => {
		const component = TestRenderer.create(
			<DataObserverWithProvider loading={true} isEmpty={(props: any) => {
				return !props.loading;
			}} >
				{(data: any) => {
					return (
						data.loading ? <Component.LoadingState />
							: data.empty ? <Native.Text>Empty</Native.Text> :
								<Native.Text>Text as a children</Native.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
