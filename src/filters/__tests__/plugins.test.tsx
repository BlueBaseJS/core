import { BlueBase } from '../../BlueBase';
import { createPlugin } from '../../registries';

describe('filters', () => {
	describe('plugins', () => {
		describe('input source', () => {
			it('should set "plugin" input source for plugins added via plugin', async () => {
				const BB = new BlueBase();
				await BB.boot({
					plugins: [
						createPlugin({
							key: 'bar',
						}),
					],
				});

				const source = BB.Plugins.getMeta('bar', 'source');

				expect(source.type).toBe('boot');
			});
		});
	});
});
