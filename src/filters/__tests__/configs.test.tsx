import { BlueBase } from '../../BlueBase';
import { createPlugin } from '../../registries';

describe('filters', () => {
	describe('configs', () => {
		describe('input source', () => {
			it('should set "system" input source for built-in configs', async () => {
				const BB = new BlueBase();
				await BB.boot();

				const source = BB.Configs.getMeta('direction', 'source');

				expect(source.type).toBe('system');
			});

			it('should set "boot" input source for configs added via boot', async () => {
				const BB = new BlueBase();
				await BB.boot({
					configs: {
						Foo: 'stub',
					},
				});

				const source = BB.Configs.getMeta('Foo', 'source');

				expect(source.type).toBe('boot');
			});

			it('should set "plugin" input source for configs added via plugin', async () => {
				const BB = new BlueBase();
				await BB.boot({
					plugins: [
						createPlugin({
							key: 'bar',

							defaultConfigs: {
								Foo: 'stub',
							},
						}),
					],
				});

				const source = BB.Configs.getMeta('Foo', 'source');

				expect(source.type).toBe('plugin');
				expect(source.key).toBe('bar');
			});
		});
	});
});
