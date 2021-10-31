import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import { Noop } from '../Noop';

const TestComponent = () => <Text>Testing</Text>;
TestComponent.displayName = 'Testing';

describe('Noop', () => {
	test('Should not render anything if there are no children', () => {
		const component = renderer.create(<Noop />);

		expect(component.root.props.children).toBeUndefined();
	});

	test('Should render children', () => {
		const component = renderer.create(
			<Noop>
				<TestComponent />
			</Noop>
		);

		expect(component.root.findByType(TestComponent).findByType(Text).props.children).toBe(
			'Testing'
		);

		// const tree = component.toTree();
	});
});
