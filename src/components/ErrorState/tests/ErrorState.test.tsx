import * as Component from '../..';
import * as Native from '../../../native';
import { ErrorState } from '../ErrorState';
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

describe('ErrorState', () => {
	beforeEach(() => {
		mockContext.mockReset();
	});

	test(`Snapshot ErrorState`, () => {
		const component = TestRenderer.create(
			<ErrorState/>
		);
		const tree = component.toTree();
		expect(tree).toMatchSnapshot();
	});

});
