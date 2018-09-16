import { BlueRain } from '../../../BlueRain';
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
			const BR = new BlueRain();
			await BR.Components.register('Button', Button);

			expect(BR.Components.Button).toBeTruthy();
		});

		it('should throw for unknown components', async () => {
			const BR = new BlueRain();
			expect(() => BR.Components.Foo).toThrow();
		});

	});


	describe('.register method', () => {

		/////////////////////////////////
		//////// React Component ////////
		/////////////////////////////////

		it('should register a React Functional Component', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', Button);

			// TODO: Add proper dom testing
			expect(BR.Components.Button).toBeTruthy();
		});

		it('should register a React Functional Component in an ES Module', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', { default: Button });

			// TODO: Add proper dom testing
			expect(BR.Components.Button).toBeTruthy();
		});

		it('should register a React Functional Component in an Promised ES Module', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', Promise.resolve({ default: Button }));

			// TODO: Add proper dom testing
			expect(BR.Components.Button).toBeTruthy();
		});

		it('should register a React Class Component', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Welcome', Welcome);

			// TODO: Add proper dom testing
			expect(BR.Components.Welcome).toBeTruthy();
		});

		it('should register a React Class Component in an ES Module', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Welcome', { default: Welcome });

			// TODO: Add proper dom testing
			expect(BR.Components.Welcome).toBeTruthy();
		});

		it('should register a React Class Component in an Promised ES Module', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Welcome', Promise.resolve({ default: Welcome }));

			// TODO: Add proper dom testing
			expect(BR.Components.Welcome).toBeTruthy();
		});

		///////////////////////////////////////
		//////// ComponentRegistryItem ////////
		///////////////////////////////////////

		it('should register a ComponentRegistryItem', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', {
				rawComponent: Button
			});

			// TODO: Add proper dom testing
			expect(BR.Components.Button).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with rawComponent in an ES Module', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', {
				rawComponent: { default: Button }
			});

			// TODO: Add proper dom testing
			expect(BR.Components.Button).toBeTruthy();
		});


		it('should register a ComponentRegistryItem, with rawComponent in a Promised ES Module', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', {
				rawComponent: Promise.resolve({ default: Button })
			});

			// TODO: Add proper dom testing
			expect(BR.Components.Button).toBeTruthy();
		});

		it('should register a ComponentRegistryItem, with preload set to true', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', {
				preload: true,
				rawComponent: Button,
			});

			expect(BR.Components.get('Button').preload).toBe(true);
		});

		it('should throw an Error for empty object', async () => {
			const BR = new BlueRain();

			let message = false;

			try {
				await BR.Components.register('Button', {} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Cound not register "Button", unknown component type.');
		});


	});


	describe('.addHocs method', () => {

		it('should add a single HOC', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', Button);
			BR.Components.addHocs('Button', () => Button);

			expect(BR.Components.get('Button').hocs).toHaveLength(1);
		});

		it('should add multiple HOCs', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', Button);
			BR.Components.addHocs('Button', () => Button);
			BR.Components.addHocs('Button', () => Button);
			BR.Components.addHocs('Button', () => Button);

			expect(BR.Components.get('Button').hocs).toHaveLength(3);
		});

		it('should not override existing HOCs', async () => {
			const BR = new BlueRain();
			await BR.Components.register('Button', {
				hocs: [() => Button],
				rawComponent: Button,
			});
			BR.Components.addHocs('Button', () => Button);

			expect(BR.Components.get('Button').hocs).toHaveLength(2);
		});

		it('should throw an Error for unregistered components', async () => {
			const BR = new BlueRain();

			let message = false;

			try {
				BR.Components.addHocs('Button', () => Button);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Count not add hocs for "Button" component. Reason: Component not found.');
		});

	});

});