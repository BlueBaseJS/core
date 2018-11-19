// import * as Component from '../..';
import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { ErrorObserver } from '../ErrorObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
const mockContext = jest.fn();

jest.mock('../../../Context', () => ({
	BlueBaseConsumer: ({ children }: { children: any }) => children(BB)
}));

describe('ErrorObserver', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});

	test(`Snapshot ErrorObserver`, () => {
		const component = TestRenderer.create(
			<ErrorObserver>
				<Native.Text>Hello</Native.Text>
			</ErrorObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ErrorObserver with error`, () => {
		const component = TestRenderer.create(
			<ErrorObserver error={{ name: '404', message: 'no page found' }}
				errorComponent={() => <Native.Text>Error</Native.Text>}>
				<Native.Text>Hello</Native.Text>
			</ErrorObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ErrorObserver with child as function`, () => {
		const component = TestRenderer.create(
			<ErrorObserver>
				{
					() => <Native.Text>Hello</Native.Text>
				}
			</ErrorObserver>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

});
