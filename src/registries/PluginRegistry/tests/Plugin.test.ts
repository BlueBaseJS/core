import { createPlugin } from '../Plugin';

describe('Plugin', () => {

	describe('createPlugin', () => {

		it('should throw an Error if pluginName is not provided', () => {
			expect(() => createPlugin({} as any)).toThrow();
		});

		it('should auto-generate a slug if it is not provided', () => {
			const plugin = createPlugin({ pluginName: 'A Plugin Name' });
			expect(plugin.slug).toBe('a-plugin-name');
		});

		it('should not auto-generate a slug if it is provided', () => {
			const plugin = createPlugin({ pluginName: 'A Plugin Name', slug: 'foo-bar' });
			expect(plugin.slug).toBe('foo-bar');
		});

		it('should not auto sluggify even a slug', () => {
			const plugin = createPlugin({ pluginName: 'A Plugin Name', slug: 'Foo Bar' });
			expect(plugin.slug).toBe('foo-bar');
		});

		it('should auto-enable a plugin by default', () => {
			const plugin = createPlugin({ pluginName: 'A Plugin Name' });
			expect(plugin.enabled).toBe(true);
		});

		it('should not auto-enable if plugin is disabled', () => {
			const plugin = createPlugin({ pluginName: 'A Plugin Name', enabled: false });
			expect(plugin.enabled).toBe(false);
		});

	});


});
