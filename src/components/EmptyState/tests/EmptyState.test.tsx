import * as Component from '../..';
import * as Native from '../../../native';
import { EmptyState } from '../EmptyState';
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

describe('EmptyState', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});

	test(`Snapshot EmptyState`, () => {
		const component = TestRenderer.create(
			<EmptyState/>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

});
