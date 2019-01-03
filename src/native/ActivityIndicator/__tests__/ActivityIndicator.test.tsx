import { ActivityIndicator } from '../index';
import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('ActivityIndicator', () => {

	test(`typeof`, () => {

		const rendered = TestRenderer.create(
			<ActivityIndicator />
		);

		expect(typeof ActivityIndicator).toBe('function');

		expect(rendered).toMatchSnapshot();
	});

});
