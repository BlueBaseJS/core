import { BlueBase } from '../../BlueBase';
import { createPlugin } from '../../registries';
import { Theme } from '../../themes';

describe('filters', () => {
	describe('themes', () => {
		describe('input source', () => {
			it('should set "system" input source for built-in themes', async () => {
				const BB = new BlueBase();
				await BB.boot();

				const source = BB.Themes.getMeta('bluebase-theme', 'source');

				expect(source.type).toBe('system');
			});

			it('should set "boot" input source for themes added via boot', async () => {
				const BB = new BlueBase();
				await BB.boot({
					themes: [new Theme({ key: 'foo' })],
				});

				const source = BB.Themes.getMeta('foo', 'source');

				expect(source.type).toBe('boot');
			});

			it('should set "plugin" input source for themes added via plugin', async () => {
				const BB = new BlueBase();
				await BB.boot({
					plugins: [
						createPlugin({
							key: 'bar',

							themes: [new Theme({ key: 'foo' })],
						}),
					],
				});

				const source = BB.Themes.getMeta('foo', 'source');

				expect(source.type).toBe('plugin');
				expect(source.key).toBe('bar');
			});
		});
	});
});
