// tslint:disable:max-classes-per-file
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

		it('should register a custom Plugin Class', async () => {

			class FooPlugin extends Plugin {
				public name = 'Dummy Plugin';
				public foo = 'bar';
			}

			const BR = new BlueRain();

			await BR.Plugins.register(FooPlugin);

			const plugin = BR.Plugins.get('dummy-plugin') as FooPlugin;

			if (!plugin) {
				throw Error();
			}

			expect(plugin.foo).toBe('bar');
		});

		it('should throw an error if unknown class is registered', async () => {
			const BR = new BlueRain();
			let message = false;

			class Foo {
				public foo = 'bar';
			}

			try {
				await BR.Plugins.register(Foo as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register plugin. Reason: Input variable is not a plugin.');
		});

		it('should throw an error if plugin is not provided', async () => {
			const BR = new BlueRain();
			let message = false;

			try {
				await BR.Plugins.register(undefined as any);
			} catch (e) {
				message = e.message;
			}

			expect(message)
				.toBe('Could not register plugin. Reason: No plugin provided in PluginRegistry\'s register method.');
		});

		it('should throw an error if empty object is registered', async () => {
			const BR = new BlueRain();
			let message = false;

			try {
				await BR.Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register plugin. Reason: Input variable is not a plugin.');
		});

		it('should throw an error if unknown data type is registered', async () => {
			const BR = new BlueRain();
			let message = false;

			try {
				await BR.Plugins.register('foo' as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register plugin. Reason: Input variable is not a plugin.');
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


	describe('Initialization', () => {

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

			await BR.boot();

			expect(BR.Hooks.get('an.event')).toHaveLength(2);
			expect(BR.Hooks.get('another.event')).toHaveLength(1);
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

			await BR.boot();

			expect(BR.Hooks.get('an.event')).toHaveLength(1);
			expect(BR.Hooks.get('another.event')).toBe(undefined);
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

			await BR.boot();

			expect(BR.Hooks.get('an.event')).toHaveLength(2);
			expect(BR.Hooks.get('another.event')).toHaveLength(1);
		});

	});


	describe('.disable method', () => {

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

			await BR.Plugins.disable('dummy-plugin');

			expect(BR.Plugins.isEnabled('dummy-plugin')).toBe(false);
		});

	});


	describe('.enable method', () => {

		it('should enable plugin', async () => {
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

			expect(BR.Plugins.isEnabled('dummy-plugin')).toBe(false);

			await BR.Plugins.enable('dummy-plugin');

			expect(BR.Plugins.isEnabled('dummy-plugin')).toBe(true);
		});

	});




	describe('.getFromSlugOrPlugin method', () => {

		it('should return a plugin from a string', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			await BR.Plugins.register({
				name: 'DummyPlugin',
			});

			expect((BR.Plugins as any).getFromSlugOrPlugin('dummy-plugin').name).toBe('DummyPlugin');
		});

		it('should return a Plugin  object as is', async () => {
			const BR = new BlueRain();

			// const Plugins = new PluginRegistry(BR);
			const plugin = (new Plugin({
				name: 'DummyPlugin',
			})).setup();

			expect((BR.Plugins as any).getFromSlugOrPlugin(plugin).slug).toBe('dummy-plugin');
		});

		it('should throw an error for unknown Plugins', async () => {
			const BR = new BlueRain();
			expect(() => (BR.Plugins as any).getFromSlugOrPlugin('foo')).toThrow();
		});

	});

});