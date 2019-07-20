import { BlueBaseApp } from '../../../';
import { DynamicIconProps } from '@bluebase/components';
import { PluginIcon } from '../PluginIcon';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';


describe('PluginIcon', () => {

	// it(`Snapshot PluginIcon component with no plugin registered`, () => {

	// 	const component = TestRenderer.create(
	// 		<BlueBaseApp>
	// 			<PluginIcon id="unregistered-plugin" />
	// 		</BlueBaseApp>
	// 	);
	// 	try {
	// 		const tree = component.toJSON();
	// 		expect(tree).toMatchSnapshot();
	// 	} catch (e) {
	// 		expect(e.message).toBe(`There's no pluign registered with "unregistered-plugin" key in the registry.`);
	// 	}
	// });

	test(`should render an image icon for a registered plugin`, (done) => {

		const plugin = {
			icon: {
				source: { uri: 'https://picsum.photos/200' },
				type: 'image' as DynamicIconProps['type'],
			},
			key: 'some',
			value: {},
		};

		const rendered = TestRenderer.create(
			<BlueBaseApp plugins={[plugin]}>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			// expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('Image');
			expect((tree as any).props.size).toBe(100);
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100 });
			done();
		});
	});

	test(`should render an image icon for a registered plugin where icon prop is a thunk`, (done) => {

		const plugin = {
			icon: () => ({
				source: { uri: 'https://picsum.photos/200' },
				type: 'image' as DynamicIconProps['type'],
			}),
			key: 'some',
			value: {},
		};

		const rendered = TestRenderer.create(
			<BlueBaseApp plugins={[plugin]}>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			// expect(tree).toMatchSnapshot();

			expect((tree as any).type).toBe('Image');
			expect((tree as any).props.size).toBe(100);
			expect((tree as any).props.style).toMatchObject({ height: 100, width: 100 });
			done();
		});
	});

	test(`should render null where plugin doesnt have an icon prop`, (done) => {

		const plugin = {
			key: 'some',
			value: {},
		};

		const rendered = TestRenderer.create(
			<BlueBaseApp plugins={[plugin]}>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			// expect(tree).toMatchSnapshot();

			expect((tree as any)).toBe(null);
			done();
		});
	});

	test(`should throw an error when a plugin is not registered`, (done) => {

		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<PluginIcon id="some" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const found = rendered.root.findAllByType(Text);
			expect(
				(found[1].children[0] as any).children.join()
			).toBe('There\'s no pluign registered with "some" key in the registry.');

			done();
		});
	});

});
