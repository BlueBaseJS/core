import * as Component from '../../../components';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseProvider } from '../../../Context';
import { DataObserver } from '../DataObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
BB.Components.register('View', Native.View);
BB.Components.register('Text', Native.Text);
BB.Components.register('Image', Native.Image);
BB.Components.register('LoadingState', Component.LoadingState);
BB.Components.register('ActivityIndicator', Native.ActivityIndicator);
BB.Components.register('ComponentState', Component.ComponentState);

describe('DataObserver', () => {
	const DataObserverWithProvider = (props: any) => (
		<BlueBaseProvider value={BB}>
			<DataObserver {...props}/>
		</BlueBaseProvider>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>{data.data}</BB.Components.Text>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>{data.data}</BB.Components.Text>
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
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>{data.data}</BB.Components.Text>
					);
				}}
			</DataObserverWithProvider>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
