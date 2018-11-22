import * as Native from '../../../native';
import { ComponentState } from '../ComponentState';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';

beforeEach(() => {
	jest.resetModules();
});


describe('ComponentState', () => {
	const ComponentStateWithProvider = (props: any) => (
		<WithProvider>
			<ComponentState {...props}/>
		</WithProvider>
	);

	test(`Snapshot ComponentState component`, () => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ComponentState component with description`, () => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider description={'This is just for test'} />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ComponentState component with description and image`, () => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider description={'This is just for test'}
				image={<Native.Image
					style={{ width: 50, height: 50 }}
					source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
				/>} />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot ComponentState component with description and imageSource`, () => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider description={'This is just for test'}
				imageSource={'hello'} />
		);
		const tree: any = component.toJSON();
		expect(tree.children[0].props.source).toEqual('hello');
	});

});
