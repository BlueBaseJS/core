import { BlueBase } from '../../../BlueBase';
import React from 'react';

const Button: React.StatelessComponent<{}> = () => <div>A Button</div>;

class Welcome extends React.Component<{ name: string }> {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}

describe('ComponentRegistry', () => {


	describe('Proxy', () => {

		it('should register a Plugin', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', Button);

			expect(BB.Components.Button).toBeTruthy();
		});

		it('should throw for unknown components', async () => {
			const BB = new BlueBase();
			expect(() => BB.Components.Foo).toThrow();
		});

	});

	describe('.resolve method', () => {

		it('should throw for unknown components', async () => {
			const BB = new BlueBase();

			let message = false;

			try {
				BB.Components.resolve('Foo');
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not resolve component "Foo". Reason: Component not registered.');
		});

	});

	describe('.register method', () => {

		/////////////////////////////////
		//////// React Component ////////
		/////////////////////////////////

		it('should register a React Functional Component', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', Button);

			// TODO: Add proper dom testing
			expect(BB.Components.Button).toBeTruthy();
		});

		it('should register a React Functional Component in an ES Module', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', { default: Button });

			// TODO: Add proper dom testing
			expect(BB.Components.Button).toBeTruthy();
		});

		it('should register a React Functional Component in an Promised ES Module', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', Promise.resolve({ default: Button }));

			// TODO: Add proper dom testing
			expect(BB.Components.Button).toBeTruthy();
		});

		it('should register a React Class Component', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Welcome', Welcome);

			// TODO: Add proper dom testing
			expect(BB.Components.Welcome).toBeTruthy();
		});

		it('should register a React Class Component in an ES Module', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Welcome', { default: Welcome });

			// TODO: Add proper dom testing
			expect(BB.Components.Welcome).toBeTruthy();
		});

		it('should register a React Class Component in an Promised ES Module', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Welcome', Promise.resolve({ default: Welcome }));

			// TODO: Add proper dom testing
			expect(BB.Components.Welcome).toBeTruthy();
		});

		///////////////////////////////////////
		//////// ComponentRegistryItem ////////
		///////////////////////////////////////

		it('should register a ComponentRegistryItem', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', {
				rawComponent: Button
			});

			// TODO: Add proper dom testing
			expect(BB.Components.Button).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with rawComponent in an ES Module', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', {
				rawComponent: { default: Button }
			});

			// TODO: Add proper dom testing
			expect(BB.Components.Button).toBeTruthy();
		});


		it('should register a ComponentRegistryItem, with rawComponent in a Promised ES Module', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', {
				rawComponent: Promise.resolve({ default: Button })
			});

			// TODO: Add proper dom testing
			expect(BB.Components.Button).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with preload set to true', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', {
				preload: true,
				rawComponent: Button,
			});

			const Component = BB.Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.preload).toBe(true);
		});

		it('should throw an Error for empty object', async () => {
			const BB = new BlueBase();

			let message = false;

			try {
				await BB.Components.register('Button', {} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Cound not register "Button". Reason: Unknown component type.');
		});


		////// Overrides

		it('should merge a ComponentRegistryItem with an existing one', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', {
				hocs: [() => Button],
				preload: true,
				rawComponent: Button,
			});
			await BB.Components.register('Button', {
				hocs: [() => Button, () => Button],
				rawComponent: Button,
			});

			const Component = BB.Components.get('Button');

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
			await BB.Components.register('Button', Button);
			BB.Components.addHocs('Button', () => Button);

			const Component = BB.Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.hocs).toHaveLength(1);
		});

		it('should add multiple HOCs', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', Button);
			BB.Components.addHocs('Button', () => Button);
			BB.Components.addHocs('Button', () => Button);
			BB.Components.addHocs('Button', () => Button);

			const Component = BB.Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.hocs).toHaveLength(3);
		});

		it('should not override existing HOCs', async () => {
			const BB = new BlueBase();
			await BB.Components.register('Button', {
				hocs: [() => Button],
				rawComponent: Button,
			});
			BB.Components.addHocs('Button', () => Button);

			const Component = BB.Components.get('Button');

			if (!Component) {
				throw Error();
			}
			expect(Component.hocs).toHaveLength(2);
		});

		it('should throw an Error for unregistered components', async () => {
			const BB = new BlueBase();

			let message = false;

			try {
				BB.Components.addHocs('Button', () => Button);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Count not add hocs for "Button" component. Reason: Component not found.');
		});

	});

});