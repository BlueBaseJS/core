import { Plugin } from '../Plugin';

describe('Plugin', () => {

	describe('createPlugin', () => {

		it('should throw an Error if name is not provided', () => {
			expect(() => (new Plugin({} as any)).setup()).toThrow();
		});

		it('should auto-generate a slug if it is not provided', () => {
			const plugin = new Plugin({ name: 'A Plugin Name' });
			expect(plugin.setup().slug).toBe('a-plugin-name');
		});

		it('should not auto-generate a slug if it is provided', () => {
			const plugin = new Plugin({ name: 'A Plugin Name', slug: 'foo-bar' });
			expect(plugin.slug).toBe('foo-bar');
		});

		it('should not auto sluggify even a slug', () => {
			const plugin = new Plugin({ name: 'A Plugin Name', slug: 'Foo Bar' });
			expect(plugin.setup().slug).toBe('foo-bar');
		});

		it('should auto-enable a plugin by default', () => {
			const plugin = new Plugin({ name: 'A Plugin Name' });
			expect(plugin.isEnabled()).toBe(true);
		});

		it('should not auto-enable if plugin is disabled', () => {
			const plugin = new Plugin({ name: 'A Plugin Name', enabled: false });
			expect(plugin.isEnabled()).toBe(false);
		});

		it('should disable plugin by .disable method', () => {
			const plugin = new Plugin({ name: 'A Plugin Name' });
			plugin.disable();
			expect(plugin.isEnabled()).toBe(false);
		});

		it('should enable plugin by .enable method', () => {
			const plugin = new Plugin({ name: 'A Plugin Name', enabled: false });
			plugin.enable();
			expect(plugin.isEnabled()).toBe(true);
		});

	});


});