import * as Component from '../..';
import * as Native from '../../../native';
import { DataObserver } from '../DataObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = {
	Components: {
		...Component,
		...Native
	}
};
const mockContext = jest.fn();

jest.mock('../../../Context', () => ({
	BlueBaseConsumer: ({ children }: { children: any }) => children(BB)
}));

describe('DataObserver', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});

	test(`Snapshot DataObserver component with Text`, () => {
		const component = TestRenderer.create(
			<DataObserver>
				<Native.Text>hello</Native.Text>
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => false} isLoading={() => true}`, () => {
		const component = TestRenderer.create(
			<DataObserver isEmpty={() => false} isLoading={() => true}>
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => true} isLoading={() => false}`, () => {
		const component = TestRenderer.create(
			<DataObserver isEmpty={() => true} isLoading={() => false}>
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => false} isLoading={() => false}`, () => {
		const component = TestRenderer.create(
			<DataObserver isEmpty={() => false} isLoading={() => false}>
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component isEmpty={() => false} loading={true}`, () => {
		const component = TestRenderer.create(
			<DataObserver isEmpty={() => false} loading={true}>
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component data={[]}`, () => {
		const component = TestRenderer.create(
			<DataObserver data={[]} >
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component data={['a', 'b']}`, () => {
		const component = TestRenderer.create(
			<DataObserver data={['a', 'b']} >
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>{data.data}</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component loading={true}`, () => {
		const component = TestRenderer.create(
			<DataObserver loading={true} >
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>{data.data}</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot DataObserver component loading={true}`, () => {
		const component = TestRenderer.create(
			<DataObserver loading={true} isEmpty={(props) => {
				return !props.loading;
			}} >
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>{data.data}</BB.Components.Text>
					);
				}}
			</DataObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

});
