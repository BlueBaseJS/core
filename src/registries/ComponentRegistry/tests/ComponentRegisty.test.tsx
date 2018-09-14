import { BlueRain } from '../../../BlueRain';


describe('ComponentRegistry', () => {


	describe('.register method', () => {

		it('should register a Plugin', async () => {

			const BR = new BlueRain();
			const Button: React.StatelessComponent<{}> = () => <div>A Button</div>;

			// const Plugins = new PluginRegistry(BR);
			await BR.Components.register('Button', Button);


			expect(BR.Components.Button).toBeTruthy();
		});

		it('should throw for unknown components', async () => {

			const BR = new BlueRain();
			expect(() => BR.Components.Foo).toThrow();
		});

	});


	// describe('.register method', () => {

	// });

});