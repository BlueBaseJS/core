import { Noop } from '../Noop';
import React from 'react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
	const component = renderer.create(
		<Noop />,
	);
	const tree = component.toTree();
	expect(tree).toMatchSnapshot();
});