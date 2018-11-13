import * as Component from '../..';
import * as Native from '../../../native';
import { LoadingState } from '../LoadingState';
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

describe('LoadingState', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});

	test(`Snapshot LoadingState component`, () => {
		const component = TestRenderer.create(
			<LoadingState />
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot LoadingState component with timedOut: true`, () => {
		const component = TestRenderer.create(
			<LoadingState timedOut={true} />
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot LoadingState component with timedOut: false`, () => {

		const component = TestRenderer.create(
			<LoadingState timedOut={false} />
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot LoadingState component with timedOut: true and retry mocked function`, () => {
		const mockedFn = jest.fn();
		const component = TestRenderer.create(
			<LoadingState timedOut={true} retry={mockedFn} />
		);
		component.root.findByType(Native.Button).props.onPress();
		const tree = component.toTree();
		expect(tree? tree.props.retry: tree).toBeCalled();
	});
});
