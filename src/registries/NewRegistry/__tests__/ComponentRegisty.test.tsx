import { BlueBase } from '../../../BlueBase';
import { ComponentRegistry } from '../';
import React from 'react';

const Button: React.StatelessComponent<{}> = () => <div>A Button</div>;

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

			expect(Components.Button).toBeTruthy();
		});

		it('should throw for unknown components', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);
			expect(() => Components.Foo).toThrow();
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
			expect(Components.Button).toBeTruthy();
		});

		it('should register a React Functional Component in an ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);
			await Components.register('Button', { default: Button } as any);

			// TODO: Add proper dom testing
			expect(Components.Button).toBeTruthy();
		});

		it('should register a React Functional Component in an Promised ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', Promise.resolve({ default: Button }) as any);

			// TODO: Add proper dom testing
			expect(Components.Button).toBeTruthy();
		});

		it('should register a React Class Component', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Welcome', Welcome);

			// TODO: Add proper dom testing
			expect(Components.Welcome).toBeTruthy();
		});

		it('should register a React Class Component in an ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Welcome', { default: Welcome } as any);

			// TODO: Add proper dom testing
			expect(Components.Welcome).toBeTruthy();
		});

		it('should register a React Class Component in an Promised ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Welcome', Promise.resolve({ default: Welcome }) as any);

			// TODO: Add proper dom testing
			expect(Components.Welcome).toBeTruthy();
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
			expect(Components.Button).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with value in an ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				value: { default: Button } as any
			});

			// TODO: Add proper dom testing
			expect(Components.Button).toBeTruthy();
		});


		it('should register a ComponentRegistryItem, with value in a Promised ES Module', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				value: Promise.resolve({ default: Button }) as any
			});

			// TODO: Add proper dom testing
			expect(Components.Button).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with preload set to true', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				meta: { preload: true, },
				value: Button,
			});

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}

			expect(Components.getMeta('Button', 'preload')).toBe(true);
			expect(Component.meta.preload).toBe(true);
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
				meta: {
					hocs: [() => Button],
				  preload: true,
				},
				value: Button,
			});
			await Components.register('Button', {
				meta: {
					hocs: [() => Button, () => Button],
				},
				value: Button,
			});

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Components.getMeta('Button', 'hocs')).toHaveLength(3);
			expect(Components.getMeta('Button', 'preload')).toBe(true);
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
			expect(Components.getMeta('Button', 'hocs')).toHaveLength(1);
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
			expect(Components.getMeta('Button', 'hocs')).toHaveLength(3);
		});

		it('should not override existing HOCs', async () => {
			const BB = new BlueBase();
			const Components = new ComponentRegistry(BB);

			await Components.register('Button', {
				meta: { hocs: [() => Button], },
				value: Button,
			});
			Components.addHocs('Button', () => Button);

			const Component = Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Components.getMeta('Button', 'hocs')).toHaveLength(2);
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

});