import { Text, View } from 'react-native';
import { BlueBase } from '../../../BlueBase';
import { BlueBaseApp } from '../../BlueBaseApp';
import { DynamicIcon } from '../DynamicIcon';
import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('DynamicIcon', () => {

	test(`should return null if there is no type prop`, (done) => {

		const DIcon = DynamicIcon as any;

		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<DIcon />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect(tree).toBe(null);
			done();
		});
	});

	test(`should render an image with default size of 100x100`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<DynamicIcon type="image" source={{ uri: 'https://picsum.photos/200' }} />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('Image');
			expect((tree as any).props.size).toBe(100);
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100 });
			done();
		});
	});

	test(`should render an image with default size of 250x250`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<DynamicIcon type="image" size={250} source={{ uri: 'https://picsum.photos/200' }} />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('Image');
			expect((tree as any).props.size).toBe(250);
			expect((tree as any).props.style).toMatchObject({ height: 250, width: 250 });
			done();
		});
	});

	test(`should render an image with style prop overwritten`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<DynamicIcon
					type="image"
					style={{ height: 250, width: 250 }}
					source={{ uri: 'https://picsum.photos/200' }}
				/>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('Image');
			expect((tree as any).props.size).toBe(100);
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100 });
			done();
		});
	});

	test(`should render an image with style prop overwritten`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<DynamicIcon
					type="image"
					style={{ height: 250, width: 250 }}
					source={{ uri: 'https://picsum.photos/200' }}
				/>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('Image');
			expect((tree as any).props.size).toBe(100);
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100 });

			done();
		});
	});

	test(`should render an custom component`, (done) => {
		const CustomComponent = ({ size }: { size: number }) => (
			<View style={{ height: size, width: size, backgroundColor: 'red' }} />
		);

		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<DynamicIcon type="component" component={CustomComponent} />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('View');
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100, backgroundColor: 'red' });

			done();
		});
	});

	test(`should render an custom component that is registered in component registry`, (done) => {

		const CustomComponent = ({ size }: { size: number }) => (
			<View style={{ height: size, width: size, backgroundColor: 'green' }} />
		);

		const BB = new BlueBase();

		const rendered = TestRenderer.create(
			<BlueBaseApp BB={BB} components={{ CustomComponent }}>
				<DynamicIcon type="component" component="CustomComponent" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('View');
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100, backgroundColor: 'green' });

			done();
		});
	});

	test(`should render an Icon component`, (done) => {

		const Icon = ({ size, name }: { size: number, name: string }) => (
			<View style={{ height: size, width: size, backgroundColor: 'blue' }}>
				<Text>
					{name}
				</Text>
			</View>
		);

		const BB = new BlueBase();

		const rendered = TestRenderer.create(
			<BlueBaseApp BB={BB} components={{ Icon }}>
				<DynamicIcon type="name" name="bus" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('View');
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100, backgroundColor: 'blue' });

			done();
		});
	});

});
