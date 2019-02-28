import { Text, View } from 'react-native';
import { BlueBase } from '../../BlueBase';
import { BlueBaseApp } from '../../components';
import { ComponentRegistry } from '../';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { getComponent } from '../../getComponent';
import { mount } from 'enzyme';

const Button: React.StatelessComponent<{}> = () => <View>A Button</View>;
(Button as any).foo = 'bar';

class Welcome extends React.Component<{ name: string }> {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}

describe('ComponentRegistry', () => {


	describe('Proxy', () => {

		it('should resolve a component through proxy', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);
			await Components.register('Button', Button);

			expect(getComponent('Button')).toBeTruthy();
		});

		it('should throw for unknown components', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);
			expect(() => Components.resolve('Foo')).toThrow();
		});

	});

	describe('.resolve method', () => {

		it('should throw for unknown components', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			let message = false;

			try {
				Components.resolve('Foo');
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not resolve any of the following components: [Foo].');
		});

		it('should resolve a component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Foo', Text);
			const Foo = Components.resolve('Foo');

			const rendered = TestRenderer.create(<Foo>Some text</Foo>);

			expect(rendered.root.props.children).toBe('Some text');
			// expect(rendered.root.type.displayName).toBe('Text');
			expect(rendered.toJSON()).toMatchSnapshot();
		});

		it('should resolve a Promised component', async (done) => {
			const Foo = getComponent('Foo');
			const wrapper = mount(
				<BlueBaseApp components={{ Foo: Promise.resolve(Text) as any }}>
					<Foo>Some text</Foo>
				</BlueBaseApp>
			);

			// expect(json).toBe(null);
			expect(wrapper).toMatchSnapshot();

			setTimeout(() => {
				wrapper.update();
				expect(wrapper).toMatchSnapshot();

				// Verify that background color is light
				const view = wrapper.find('Foo').find('Text').last();
				expect(view.text()).toBe('Some text');

				done();
			});
		});

		it('should add an HOC that makes background green', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Button);
			Components.addHocs('Button', (Comp: React.ComponentType) => () => (
				<View style={{ backgroundColor: 'green' }}>
					<Comp />
				</View>
			));

			const ResolvedComponent = Components.resolve('Button');

			const rendered = TestRenderer.create(<ResolvedComponent />);
			const tree = rendered.toJSON() as any;
			expect(tree.props.style.backgroundColor).toBe('green');
			expect(tree).toMatchSnapshot();
		});

		it('should add an HOC with its arguments that makes background orange', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Button);

			const hoc = (args: { backgroundColor: string }) =>
			(Comp: React.ComponentType) =>
			() => (
				<View style={{ backgroundColor: args.backgroundColor }}>
					<Comp />
				</View>
			);

			Components.addHocs('Button', [hoc, { backgroundColor: 'orange' }]);

			const ResolvedComponent = Components.resolve('Button');

			const rendered = TestRenderer.create(<ResolvedComponent />);
			const tree = rendered.toJSON() as any;
			expect(tree.props.style.backgroundColor).toBe('orange');
			expect(tree).toMatchSnapshot();
		});

		it('should not apply styles if applyStyles flag is set false', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register({
				applyStyles: false,
				key: 'Button',
				value: Button,
			});

			const ResolvedComponent = Components.resolve('Button');

			const rendered = TestRenderer.create(<ResolvedComponent />);
			const tree = rendered.toJSON() as any;
			expect(tree.props.styles).toBeUndefined();
			expect(tree).toMatchSnapshot();
		});

		it('should hoist static properties of the original component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Button);

			const hoc = (args: { backgroundColor: string }) =>
			(Comp: React.ComponentType) =>
			() => (
				<View style={{ backgroundColor: args.backgroundColor }}>
					<Comp />
				</View>
			);

			Components.addHocs('Button', [hoc, { backgroundColor: 'orange' }]);

			const ResolvedComponent = Components.resolve('Button');

			expect((ResolvedComponent as any).foo).toBe('bar');
		});

	});

	describe('.register method', () => {

		/////////////////////////////////
		//////// React Component ////////
		/////////////////////////////////

		it('should register a React Functional Component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);
			await Components.register('Button', Button);

			// TODO: Add proper dom testing
			expect(getComponent('Button')).toBeTruthy();
		});

		it('should register a React Functional Component in an ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);
			await Components.register('Button', { default: Button } as any);

			// TODO: Add proper dom testing
			expect(getComponent('Button')).toBeTruthy();
		});

		it('should register a React Functional Component in an Promised ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Promise.resolve({ default: Button }) as any);

			// TODO: Add proper dom testing
			expect(getComponent('Button')).toBeTruthy();
		});

		it('should register a React Class Component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Welcome', Welcome);

			// TODO: Add proper dom testing
			expect(getComponent('Welcome')).toBeTruthy();
		});

		it('should register a React Class Component in an ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Welcome', { default: Welcome } as any);

			// TODO: Add proper dom testing
			expect(getComponent('Welcome')).toBeTruthy();
		});

		it('should register a React Class Component in an Promised ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Welcome', Promise.resolve({ default: Welcome }) as any);

			// TODO: Add proper dom testing
			expect(getComponent('Welcome')).toBeTruthy();
		});

		///////////////////////////////////////
		//////// ComponentRegistryItem ////////
		///////////////////////////////////////

		it('should register a ComponentRegistryItem', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				value: Button
			});

			// TODO: Add proper dom testing
			expect(getComponent('Button')).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with value in an ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				value: { default: Button } as any
			});

			// TODO: Add proper dom testing
			expect(getComponent('Button')).toBeTruthy();
		});


		it('should register a ComponentRegistryItem, with value in a Promised ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				value: Promise.resolve({ default: Button }) as any
			});

			// TODO: Add proper dom testing
			expect(getComponent('Button')).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with preload set to true', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				preload: true,
				value: Button,
			});

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}

			expect(Component.preload).toBe(true);
		});

		it('should throw an Error for empty object', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);


			let message = false;

			try {
				await Components.register('Button', {} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register item. Reason: Unknown item type.');
		});


		////// Overrides

		it('should merge a ComponentRegistryItem with an existing one', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				hocs: [() => Button],
				preload: true,
				value: Button,
			});
			await Components.register('Button', {
				hocs: [() => Button, () => Button],
				value: Button,
			});

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.hocs).toHaveLength(3);
			expect(Component.preload).toBe(true);
		});
	});


	describe('.addHocs method', () => {

		it('should add a single HOC', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Button);
			Components.addHocs('Button', () => Button);

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.hocs).toHaveLength(1);
		});

		it('should add multiple HOCs', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Button);
			Components.addHocs('Button', () => Button);
			Components.addHocs('Button', () => Button);
			Components.addHocs('Button', () => Button);

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.hocs).toHaveLength(3);
		});

		it('should not override existing HOCs', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				hocs: [() => Button],
				value: Button,
			});
			Components.addHocs('Button', () => Button);

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.hocs).toHaveLength(2);
		});

		it('should throw an Error for unregistered components', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);


			let message = false;

			try {
				Components.addHocs('Button', () => Button);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not add hocs for "Button" component. Reason: Component not found.');
		});

	});


	describe('.setStyles/getStyles method', () => {

		it('should set & get styles of a Component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Button);
			Components.setStyles('Button', {
				root: {
					backgroundColor: 'blue',
				}
			});

			const styles = Components.getStyles('Button');

			if (!styles) {
				throw Error();
			}
			expect(styles).toMatchObject({
				root: {
					backgroundColor: 'blue',
				}
			});
		});

		it('should throw an Error if setting styles of an unknown component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			try {
				Components.setStyles('Button', {
					root: {
						backgroundColor: 'blue',
					}
				});
			} catch (error) {
				expect(error.message).toBe('Cannot set styles "Button" component. Reason: Component not found.');
			}

		});

		it('should return undefined if getting styles of an unknown component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);
			expect(Components.getStyles('Button')).toBe(undefined);
		});

	});

});