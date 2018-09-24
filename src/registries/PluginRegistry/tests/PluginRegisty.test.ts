import { BlueRain } from '../../../BlueRain';
import { BlueRainModule } from '../../../utils';
import { Plugin } from '../../../models/Plugin';


describe('PluginRegistry', () => {

	describe('.register method', () => {

		it('should register a Plugin', async () => {

			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({ name: 'DummyPlugin', slug: 'plugin-slug' });

			const plugin = BR.Plugins.get('plugin-slug');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin with auto generated slug', async () => {

			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register(new Plugin({ name: 'DummyPlugin' }));

			const plugin = BR.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from an ES Module', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({ __esModule: true, default: { name: 'DummyPlugin' } });

			const plugin = BR.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from a Promised ES Module', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register(Promise.resolve({ __esModule: true, default: { name: 'DummyPlugin' } }));

			const plugin = BR.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from an ES Module in a BlueRainModule', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register(new BlueRainModule({ __esModule: true, default: { name: 'DummyPlugin' } }));

			const plugin = BR.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from a Promise', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register(Promise.resolve({ name: 'DummyPlugin' }));

			const plugin = BR.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should throw an error if plugin is not provided', async () => {
			const BR = new BlueRain();
			let message = false;

			try {
				await BR.Plugins.register(undefined as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

		it('should throw an error if name is not provided', async () => {
			const BR = new BlueRain();
			let message = false;

			try {
				await BR.Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

	});


	describe('.unregister method', () => {

		it('should unregister a Plugin', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({ name: 'DummyPlugin', slug: 'plugin-slug' });

			let plugin = BR.Plugins.get('plugin-slug');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');

			BR.Plugins.unregister(plugin.slug);

			plugin = BR.Plugins.get('plugin-slug');
			expect(plugin).toBe(undefined);
		});

	});


	describe('.initialize method', () => {

		it('should initialize plugins', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
				},
				name: 'DummyPlugin2',
			});

			expect(BR.Hooks.size()).toBe(0);

			await BR.Plugins.initialize();

			expect(BR.Hooks.size()).toBe(2);
		});

		it('should not initialize disabled plugins', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				enabled: false,
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
				},
				name: 'DummyPlugin2',
			});

			expect(BR.Hooks.size()).toBe(0);

			await BR.Plugins.initialize();

			expect(BR.Hooks.size()).toBe(1);
		});

		it('should not initialize plugins with hooks in a thunk', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				hooks: () => ({
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				}),
				name: 'DummyPlugin',
			});

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				hooks: () => ({
					'an.event': (val: number) => val,
				}),
				name: 'DummyPlugin2',
			});

			expect(BR.Hooks.size()).toBe(0);

			await BR.Plugins.initialize();

			expect(BR.Hooks.size()).toBe(2);
		});

	});


	describe('.disablePlugin method', () => {

		it('should disable plugin', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			expect(BR.Plugins.isEnabled('dummy-plugin')).toBe(true);

			await BR.Plugins.disablePlugin('dummy-plugin');

			expect(BR.Plugins.isEnabled('dummy-plugin')).toBe(false);
		});

		it('should not initialize disabled plugins', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				enabled: false,
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
				},
				name: 'DummyPlugin2',
			});

			expect(BR.Hooks.size()).toBe(0);

			await BR.Plugins.initialize();

			expect(BR.Hooks.size()).toBe(1);
		});

	});




	describe('.resolveSlugOrPlugin method', () => {

		it('should return a plugin from a string', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				name: 'DummyPlugin',
			});

			expect((BR.Plugins as any).resolveSlugOrPlugin('dummy-plugin').name).toBe('DummyPlugin');
		});

		it('should return a Plugin  object as is', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			const plugin = new Plugin({
				name: 'DummyPlugin',
			});

			expect((BR.Plugins as any).resolveSlugOrPlugin(plugin).slug).toBe('dummy-plugin');
		});

		it('should throw an error for unknown Plugins', async () => {
			const BR = new BlueRain();
			expect(() => (BR.Plugins as any).resolveSlugOrPlugin('foo')).toThrow();
		});

	});

});