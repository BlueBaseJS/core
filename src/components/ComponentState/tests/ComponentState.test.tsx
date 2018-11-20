import * as Native from '../../../native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseProvider } from '../../../Context';
import { ComponentState } from '../ComponentState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});

const BB = new BlueBase();
BB.Components.register('View', Native.View);
BB.Components.register('Text', Native.Text);
BB.Components.register('Image', Native.Image);



describe('ComponentState', () => {
	const ComponentStateWithProvider = (props: any) => (
		<BlueBaseProvider value={BB}>
			<ComponentState {...props}/>
		</BlueBaseProvider>
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
