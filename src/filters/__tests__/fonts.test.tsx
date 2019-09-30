import { BlueBase } from '../../BlueBase';
import { createPlugin } from '../../registries';

describe('filters', () => {
	describe('fonts', () => {
		describe('input source', () => {
			it('should set "boot" input source for fonts added via boot', async () => {
				const BB = new BlueBase();
				await BB.boot({
					fonts: {
						Foo: { value: 'stub' },
					},
				});

				const source = BB.Fonts.getMeta('Foo', 'source');

				expect(source.type).toBe('boot');
			});

			it('should set "plugin" input source for fonts added via plugin', async () => {
				const BB = new BlueBase();
				await BB.boot({
					plugins: [
						createPlugin({
							key: 'bar',

							fonts: {
								Foo: { value: 'stub' },
							},
						}),
					],
				});

				const source = BB.Fonts.getMeta('Foo', 'source');

				expect(source.type).toBe('plugin');
				expect(source.key).toBe('bar');
			});
		});
	});
});
