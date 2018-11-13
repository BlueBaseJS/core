import * as Component from '../..';
import * as Native from '../../../native';
import { ComponentState } from '../ComponentState';
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

describe('ComponentState', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});

	test(`Snapshot ComponentState component`, () => {
		const component = TestRenderer.create(
			<ComponentState />
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ComponentState component with description`, () => {
		const component = TestRenderer.create(
			<ComponentState description={'This is just for test'} />
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ComponentState component with description and image`, () => {
		const component = TestRenderer.create(
			<ComponentState description={'This is just for test'}
				image={<Native.Image
					style={{ width: 50, height: 50 }}
					source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
				/>} />
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ComponentState component with description and imageSource`, () => {
		const component = TestRenderer.create(
			<ComponentState description={'This is just for test'}
				imageSource={'hello'} />
		);
		const tree = component.toTree();
		expect(tree ? tree.props.imageSource : tree).toEqual('hello');
	});

});
