// tslint:disable:object-literal-sort-keys
import { BlueBase } from '../../../BlueBase';
import { ThemeRegistry } from '../ThemeRegistry';


describe('ThemeRegistry', () => {

	describe('.register method', () => {

		it('should register a theme with default properties', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			await Themes.register('foo', { value: { components: {} } });

			const theme = await Themes.get('foo');

			expect(theme && theme.name).toBe('Untitled Theme');
			expect(theme && theme.mode).toBe('light');
		});


		it('should register a theme with given properties', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			await Themes.register('foo', {
				name: 'BlueBase Test Theme',
				mode: 'dark',
				value: { components: {} },
			});

			const theme = await Themes.get('foo');

			expect(theme && theme.name).toBe('BlueBase Test Theme');
			expect(theme && theme.mode).toBe('dark');
		});

	});

	describe('.resolve method', () => {

		it('should resolve a merged theme with default properties', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			await Themes.register('foo', { value: { } });

			const theme = await Themes.resolve('foo');

			expect(theme && theme.name).toBe('Untitled Theme');
			expect(theme && theme.mode).toBe('light');
			expect(theme && theme.key).toBe('foo');
			expect(theme && theme.alternate).toBe('bluebase-dark');
			expect(theme && theme.components).toBeTruthy();
			expect(theme && theme.palette).toBeTruthy();
		});

		it('should throw an error for unknown themes', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			try {
				await Themes.resolve('foo');
			} catch (error) {
				expect(error.message).toBe('Could not resolve any of the following themes: [foo].');
			}
		});


	});

	describe('.resolveAlternate method', () => {

		it('should resolve a merged theme with default properties', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			await Themes.register({
				key: 'light',
				mode: 'light',
				name: 'Light Theme',
				alternate: 'dark',
				value: {}
			});

			await Themes.register({
				key: 'dark',
				mode: 'dark',
				name: 'Dark Theme',
				alternate: 'light',
				value: {}
			});

			let theme = await Themes.resolve('light');

			expect(theme && theme.name).toBe('Light Theme');
			expect(theme && theme.mode).toBe('light');
			expect(theme && theme.key).toBe('light');

			theme = await Themes.resolveAlternate('light');

			expect(theme && theme.name).toBe('Dark Theme');
			expect(theme && theme.mode).toBe('dark');
			expect(theme && theme.key).toBe('dark');
		});

		it('should throw an error for unknown themes', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			try {
				await Themes.resolveAlternate('foo');
			} catch (error) {
				expect(error.message).toBe('Could not resolve alternate theme of "foo".');
			}
		});


	});

});