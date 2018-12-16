import * as Native from '../../../native';
import { BlueBaseApp } from '../../BlueBaseApp';
import { ComponentState } from '../ComponentState';
import React from 'react';
import TestRenderer from 'react-test-renderer';

beforeEach(() => {
	jest.resetModules();
});


describe('ComponentState', () => {
	const ComponentStateWithProvider = (props: any) => (
		<BlueBaseApp>
			<ComponentState {...props}/>
		</BlueBaseApp>
	);

	test(`Snapshot ComponentState component`, (done) => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ComponentState component with description`, (done) => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider description={'This is just for test'} />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ComponentState component with description and image`, (done) => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider description={'This is just for test'}
				image={<Native.Image
					style={{ width: 50, height: 50 }}
					source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
				/>} />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ComponentState component with description and imageSource`, (done) => {
		const component = TestRenderer.create(
			<ComponentStateWithProvider description={'This is just for test'}
				imageSource={'hello'} />
		);
		setTimeout(() => {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
