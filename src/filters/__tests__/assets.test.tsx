import { BlueBase } from '../../BlueBase';
import { createPlugin } from '../../registries';

describe('filters', () => {
	describe('assets', () => {
		describe('input source', () => {
			it('should set "system" input source for built-in assets', async () => {
				const BB = new BlueBase();
				await BB.boot();

				const source = BB.Assets.getMeta('Logo', 'source');

				expect(source.type).toBe('system');
			});

			it('should set "boot" input source for assets added via boot', async () => {
				const BB = new BlueBase();
				await BB.boot({
					assets: {
						Foo: 'stub',
					},
				});

				const source = BB.Assets.getMeta('Foo', 'source');

				expect(source.type).toBe('boot');
			});

			it('should set "plugin" input source for assets added via plugin', async () => {
				const BB = new BlueBase();
				await BB.boot({
					plugins: [
						createPlugin({
							key: 'bar',

							assets: {
								Foo: 'stub',
							},
						}),
					],
				});

				const source = BB.Assets.getMeta('Foo', 'source');

				expect(source.type).toBe('plugin');
				expect(source.key).toBe('bar');
			});
		});
	});
});
