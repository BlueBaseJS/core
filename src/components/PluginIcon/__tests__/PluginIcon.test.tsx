import { BlueBaseApp } from '../../BlueBaseApp';
import { PluginIcon } from '../PluginIcon';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { BlueBase } from '../../../BlueBase';


describe('PluginIcon', () => {
	beforeEach(() => {
		jest.resetModules();
	});
	const PluginIconWithProvider = (props: any) => (
		<BlueBaseApp>
			<PluginIcon {...props} />
		</BlueBaseApp>
	);

	it(`Snapshot PluginIcon component with no plugin registered`, () => {

		const component = TestRenderer.create(
			<PluginIconWithProvider slug="unregistered-plugin" />
		);
		try {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
		} catch (e) {
			expect(e.message).toBe(`There's no pluign registered with "unregistered-plugin" key in the registry.`);
		}
	});

	test(`should render an image icon for a registered plugin`, (done) => {

		const plugin = {
			icon: {
				source: { uri: 'https://picsum.photos/200' },
				type: 'image',
			},
			key: 'some',
			value: {},
		};

		const BB = new BlueBase();

		const rendered = TestRenderer.create(
			<BlueBaseApp BB={BB} plugins={[plugin]}>
				<PluginIcon slug="some" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).type).toBe('View');
			expect((tree as any).children[0].type).toBe('Image');
			expect((tree as any).children[0].props.size).toBe(100);
			expect((tree as any).children[0].props.style).toMatchObject({ height: 100, width: 100 });
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render an image icon for a registered plugin where icon prop is a thunk`, (done) => {

		const plugin = {
			icon: () => ({
				source: { uri: 'https://picsum.photos/200' },
				type: 'image',
			}),
			key: 'some',
			value: {},
		};

		const BB = new BlueBase();

		const rendered = TestRenderer.create(
			<BlueBaseApp BB={BB} plugins={[plugin]}>
				<PluginIcon slug="some" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).type).toBe('View');
			expect((tree as any).children[0].type).toBe('Image');
			expect((tree as any).children[0].props.size).toBe(100);
			expect((tree as any).children[0].props.style).toMatchObject({ height: 100, width: 100 });
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render null where plugin doesnt have an icon prop`, (done) => {

		const plugin = {
			key: 'some',
			value: {},
		};

		const BB = new BlueBase();

		const rendered = TestRenderer.create(
			<BlueBaseApp BB={BB} plugins={[plugin]}>
				<PluginIcon slug="some" />
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).type).toBe('View');
			expect((tree as any).children).toBe(null);
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});
