// tslint:disable:max-classes-per-file
import { BlueBaseModule, createBlueBaseModule } from '../../../utils';
import { BlueBase } from '../../../BlueBase';
import { Plugin } from '../../../models/Plugin';

describe('PluginRegistry', () => {

	describe('.register method', () => {

		it('should register a Plugin', async () => {

			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({ name: 'DummyPlugin', slug: 'plugin-slug' });

			const plugin = BB.Plugins.get('plugin-slug');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin with auto generated slug', async () => {

			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register(new Plugin({ name: 'DummyPlugin' }));

			const plugin = BB.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from an ES Module', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({ __esModule: true, default: { name: 'DummyPlugin' } } as any);

			const plugin = BB.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from a Promised ES Module', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register(Promise.resolve({ __esModule: true, default: { name: 'DummyPlugin' } }) as any);

			const plugin = BB.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from an ES Module in a BlueBaseModule', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register(createBlueBaseModule({ __esModule: true, default: { name: 'DummyPlugin' } }) as any);

			const plugin = BB.Plugins.get('dummy-plugin');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from a Promise', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register(Promise.resolve({ name: 'DummyPlugin' }) as BlueBaseModule<{ name: string }>);

			const plugin = BB.Plugins.get('dummy-plugin');

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

			const BB = new BlueBase();

			await BB.Plugins.register(FooPlugin);

			const plugin = BB.Plugins.get('dummy-plugin') as FooPlugin;

			if (!plugin) {
				throw Error();
			}

			expect(plugin.foo).toBe('bar');
		});

		it('should throw an error if unknown class is registered', async () => {
			const BB = new BlueBase();
			let message = false;

			class Foo {
				public foo = 'bar';
			}

			try {
				await BB.Plugins.register(Foo as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register plugin. Reason: Input variable is not a plugin.');
		});

		it('should throw an error if plugin is not provided', async () => {
			const BB = new BlueBase();
			let message = false;

			try {
				await BB.Plugins.register(undefined as any);
			} catch (e) {
				message = e.message;
			}

			expect(message)
				.toBe('Could not register plugin. Reason: No plugin provided in PluginRegistry\'s register method.');
		});

		it('should throw an error if empty object is registered', async () => {
			const BB = new BlueBase();
			let message = false;

			try {
				await BB.Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register plugin. Reason: Input variable is not a plugin.');
		});

		it('should throw an error if unknown data type is registered', async () => {
			const BB = new BlueBase();
			let message = false;

			try {
				await BB.Plugins.register('foo' as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register plugin. Reason: Input variable is not a plugin.');
		});

		it('should throw an error if name is not provided', async () => {
			const BB = new BlueBase();
			let message = false;

			try {
				await BB.Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

	});


	describe('.unregister method', () => {

		it('should unregister a Plugin', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({ name: 'DummyPlugin', slug: 'plugin-slug' });

			let plugin = BB.Plugins.get('plugin-slug');

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');

			BB.Plugins.unregister(plugin.slug);

			plugin = BB.Plugins.get('plugin-slug');
			expect(plugin).toBe(undefined);
		});

	});


	describe('Initialization', () => {

		it('should initialize plugins', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
				},
				name: 'DummyPlugin2',
			});

			expect(BB.Hooks.size()).toBe(0);

			await BB.boot();

			expect(BB.Hooks.get('an.event')).toHaveLength(2);
			expect(BB.Hooks.get('another.event')).toHaveLength(1);
		});

		it('should not initialize disabled plugins', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				enabled: false,
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
				},
				name: 'DummyPlugin2',
			});

			expect(BB.Hooks.size()).toBe(0);

			await BB.boot();

			expect(BB.Hooks.get('an.event')).toHaveLength(1);
			expect(BB.Hooks.get('another.event')).toBe(undefined);
		});

		it('should not initialize plugins with hooks in a thunk', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				hooks: () => ({
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				}),
				name: 'DummyPlugin',
			});

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				hooks: () => ({
					'an.event': (val: number) => val,
				}),
				name: 'DummyPlugin2',
			});

			expect(BB.Hooks.size()).toBe(0);

			await BB.boot();

			expect(BB.Hooks.get('an.event')).toHaveLength(2);
			expect(BB.Hooks.get('another.event')).toHaveLength(1);
		});

	});


	describe('.disable method', () => {

		it('should disable plugin', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			expect(BB.Plugins.isEnabled('dummy-plugin')).toBe(true);

			await BB.Plugins.disable('dummy-plugin');

			expect(BB.Plugins.isEnabled('dummy-plugin')).toBe(false);
		});

	});


	describe('.enable method', () => {

		it('should enable plugin', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				enabled: false,
				hooks: {
					'an.event': (val: number) => val,
					'another.event': (val: number) => val,
				},
				name: 'DummyPlugin',
			});

			expect(BB.Plugins.isEnabled('dummy-plugin')).toBe(false);

			await BB.Plugins.enable('dummy-plugin');

			expect(BB.Plugins.isEnabled('dummy-plugin')).toBe(true);
		});

	});




	describe('.getFromSlugOrPlugin method', () => {

		it('should return a plugin from a string', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			await BB.Plugins.register({
				name: 'DummyPlugin',
			});

			expect((BB.Plugins as any).getFromSlugOrPlugin('dummy-plugin').name).toBe('DummyPlugin');
		});

		it('should return a Plugin  object as is', async () => {
			const BB = new BlueBase();

			// const Plugins = new PluginRegistry(BB);
			const plugin = (new Plugin({
				name: 'DummyPlugin',
			})).setup();

			expect((BB.Plugins as any).getFromSlugOrPlugin(plugin).slug).toBe('dummy-plugin');
		});

		it('should throw an error for unknown Plugins', async () => {
			const BB = new BlueBase();
			expect(() => (BB.Plugins as any).getFromSlugOrPlugin('foo')).toThrow();
		});

	});

});