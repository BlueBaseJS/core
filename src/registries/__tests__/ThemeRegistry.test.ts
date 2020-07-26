// tslint:disable:object-literal-sort-keys
import { BlueBase } from '../../BlueBase';
import { Theme } from '../../themes';
import { ThemeRegistry } from '../ThemeRegistry';

describe('ThemeRegistry', () => {
	describe('.register method', () => {
		it('should register a theme with default properties', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			await Themes.register(new Theme());

			const theme = await Themes.getValue('bluebase-theme');

			expect(theme!.name).toBe('BlueBase Theme');
			expect(theme!.mode).toBe('light');
		});

		it('should register a theme with given properties', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			const input = new Theme({
				name: 'BlueBase Test Theme',
				key: 'foo',
			});

			input.mode = 'dark';

			await Themes.register(input);

			const theme = Themes.getValue('foo');

			expect(theme!.name).toBe('BlueBase Test Theme');
			expect(theme!.mode).toBe('dark');
		});

		it('should throw an error for unknown themes', async () => {
			const BB = new BlueBase();
			const Themes = new ThemeRegistry(BB);

			try {
				Themes.getValue('foo');
			} catch (error) {
				expect(error.message).toBe('Could not resolve any of the following themes: [foo].');
			}
		});
	});
});
