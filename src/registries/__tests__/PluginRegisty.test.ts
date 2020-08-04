// tslint:disable:max-classes-per-file
import { PluginInput, PluginRegistry, createPlugin } from '../PluginRegistry';

import { BlueBase } from '../../BlueBase';
import { NoopProps } from '@bluebase/components';
import { createBlueBaseModule } from '../../utils';
import { getComponent } from '../../getComponent';

const Noop = getComponent<NoopProps>('Noop');

describe('PluginRegistry', () => {
	describe('.register method', () => {
		it('should register a Plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register({
				key: 'dummy-plugin',
				name: 'Dummy Plugin',
				value: {},
			});

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should register a Plugin with auto generated slug', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			// const Plugins = new PluginRegistry(BB);
			const key = await Plugins.register({ name: 'DummyPlugin', value: {} });

			const plugin = await Plugins.resolve(key);

			if (!plugin) {
				throw Error();
			}

			expect(plugin.name).toBe('DummyPlugin');
		});

		it('should register a Plugin from an ES Module', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register({
				__esModule: true,
				default: {
					key: 'dummy-plugin',
					name: 'Dummy Plugin',
					value: {},
				},
			} as any);

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should register a Plugin from a Promised ES Module', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(
				Promise.resolve({
					__esModule: true,
					default: {
						key: 'dummy-plugin',
						name: 'Dummy Plugin',
						value: {},
					},
				}) as any
			);

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should register a Plugin from an ES Module in a BlueBaseModule', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(
				createBlueBaseModule({
					__esModule: true,
					default: {
						key: 'dummy-plugin',
						name: 'Dummy Plugin',
						value: {},
					},
				}) as any
			);

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should register a Plugin from a Promise', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(
				Promise.resolve({
					key: 'dummy-plugin',
					name: 'Dummy Plugin',
					value: {},
				}) as any
			);

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should throw an error if unknown class is registered', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = '';

			class Foo {
				public foo: string = 'bar';
			}

			try {
				await Plugins.register(Foo as any);
			} catch (e) {
				message = e.message;
			}

			expect(message.startsWith('Could not register item with key "class Foo')).toBe(true);
		});

		it('should throw an error if plugin is not provided', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register(undefined as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register item with key "undefined". Reason: No item given.');
		});

		it('should throw an error if empty object is registered', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe(
				'Could not register item with key "[object Object]". Reason: No item given.'
			);
		});

		it('should throw an error if unknown data type is registered', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register('foo' as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register item with key "foo". Reason: No item given.');
		});

		it('should throw an error if name is not provided', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});
	});

	describe('.resolve method', () => {
		it('should resolve a merged plugin with default properties', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register('foo', { enabled: false, value: {} });

			const plugin = await Plugins.resolve('foo');

			expect(plugin.name).toBe('Untitled Plugin');
			expect(plugin.enabled).toBe(false);
			expect(plugin.components).toMatchObject({});
			expect(plugin.themes).toMatchObject({});
		});

		it('should throw an error for unknown plugins', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			try {
				await Plugins.resolve('foo');
			} catch (error) {
				expect(error.message).toBe('Could not resolve any of the following plugins: [foo].');
			}
		});
	});

	describe('.hasConfig method', () => {
		it('should return true, becuase config is has a default value in plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register('foo', { defaultConfigs: { 'some.config': true }, value: {} });

			expect(Plugins.hasConfig('foo', 'some.config')).toBe(true);
		});

		it('should return true, becuase config starts with plugin.foo.', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register('foo', { defaultConfigs: { 'some.config': true }, value: {} });

			expect(Plugins.hasConfig('foo', 'plugin.foo.xyz')).toBe(true);
		});

		it('should return false, becuase config does not have default value in plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register('foo', { defaultConfigs: { 'some.config': true }, value: {} });

			expect(Plugins.hasConfig('foo', 'other.config')).toBe(false);
		});

		it('should throw an error for unknown plugins', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			try {
				Plugins.hasConfig('foo', 'other.config');
			} catch (error) {
				expect(error.message).toBe(
					'Could not check config for a plugin. Reason: No plugin registered by key "foo".'
				);
			}
		});
	});

	describe('.isEnabled method', () => {
		it('should return false', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register('foo', { enabled: false, value: {} });

			expect(Plugins.isEnabled('foo')).toBe(false);
		});

		it('should return true', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register('foo', { enabled: true, value: {} });

			expect(Plugins.isEnabled('foo')).toBe(true);
		});

		it('should throw an error when trying to check an unknown plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			try {
				Plugins.isEnabled('foo');
			} catch (e) {
				expect(e.message).toBe(
					'Could not check if plugin is enabled. Reason: No plugin registered by key "foo".'
				);
			}
		});
	});

	describe('.enable/.disable method', () => {
		it('should enable and disable plugins', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register('foo', { enabled: false, value: {} });

			await Plugins.enable('foo');
			expect(Plugins.isEnabled('foo')).toBe(true);

			await Plugins.disable('foo');
			expect(Plugins.isEnabled('foo')).toBe(false);
		});

		it('should throw an error when trying to enable an unknown plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			try {
				await Plugins.enable('foo');
			} catch (e) {
				expect(e.message).toBe(
					'Could not enable plugin. Reason: No plugin registered by key "foo".'
				);
			}
		});

		it('should throw an error when trying to disable an unknown plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message;
			try {
				await Plugins.disable('foo');
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not disable plugin. Reason: No plugin registered by key "foo".');
		});
	});

	describe('.delete method', () => {
		it('should unregister a Plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register({
				key: 'dummy-plugin',
				name: 'Dummy Plugin',
				value: {},
			});

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');

			Plugins.delete('dummy-plugin');

			const plugin = Plugins.get('dummy-plugin');
			expect(plugin).toBe(undefined);
		});
	});

	describe('.isInputValue method', () => {
		it('should return true if input is a BlueBaseModule', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			expect((Plugins as any).isInputValue(createBlueBaseModule({}))).toBe(true);
		});

		it('should return true if input is an object', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			expect((Plugins as any).isInputValue({})).toBe(true);
		});

		it('should return false if input is a string', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			expect((Plugins as any).isInputValue('foo')).toBe(false);
		});
	});

	describe('.createPlugin method', () => {
		it('should convert Plugin to PluginInput', async () => {
			const input = createPlugin({
				key: 'foo',
				name: 'Foo',

				components: { Foo: Noop },
				filters: { Bar: Noop },

				value: {
					filters: { Baz: Noop },
				},
			});

			expect(input.key).toBe('foo');
			expect(input.name).toBe('Foo');
			expect(input.enabled).toBe(true);
			expect(input.components).toBe(undefined);
			expect(input.filters).toBe(undefined);
			expect((input as any).value.components.Foo).toBeTruthy();
			expect((input as any).value.filters.Baz).toBeTruthy();
		});
	});

	describe('routes prop in plugins', () => {
		it('should register routes from routes object', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(createPlugin({ key: 'P1', routes: { name: 'P1_Route', path: 'a' } }));

			const routes = await Plugins.getRouteMap();

			expect(routes).toMatchObject({
				P1: [
					{
						name: 'P1_Route',
						path: 'P1/a',
					},
				],
			});
		});

		it('should register routes from routes thunk', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(
				createPlugin({ key: 'P1', routes: () => ({ name: 'P1_Route', path: 'a' }) })
			);

			const routes = await Plugins.getRouteMap();

			expect(routes).toMatchObject({
				P1: [
					{
						name: 'P1_Route',
						path: 'P1/a',
					},
				],
			});
		});

		it('should register routes from routes that is a promise', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(
				createPlugin({ key: 'P1', routes: Promise.resolve({ name: 'P1_Route', path: 'a' }) })
			);

			const routes = await Plugins.getRouteMap();

			expect(routes).toMatchObject({
				P1: [
					{
						name: 'P1_Route',
						path: 'P1/a',
					},
				],
			});
		});

		it('should register routes from routes thunk that returns a promise', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(
				createPlugin({ key: 'P1', routes: () => Promise.resolve({ name: 'P1_Route', path: 'a' }) })
			);

			const routes = await Plugins.getRouteMap();

			expect(routes).toMatchObject({
				P1: [
					{
						name: 'P1_Route',
						path: 'P1/a',
					},
				],
			});
		});
	});

	describe('.getRoutes method', () => {
		it('should create a routes map with plugin key as prefixs', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			const p1: PluginInput = {
				key: 'p1',
				name: 'P1',
				value: {
					routes: {
						name: 'P1_Route',
						path: '/',
					},
				},
			};

			const p2: Promise<PluginInput> = Promise.resolve({
				key: 'p2',
				name: 'P2',
				value: {
					routes: [
						{
							name: 'P2_Route_A',
							path: '',
						},
						{
							name: 'P2_Route_B',
							path: 'b',
						},
					],
				},
			});

			// should be skipped as not enabled
			const p3: PluginInput = {
				key: 'p3',
				name: 'P3',
				value: { routes: { name: 'P3_Route', path: 'p3' } },
			};

			// should be skipped as there are no routes
			const p4: PluginInput = {
				key: 'p4',
				name: 'P4',
				value: {},
			};

			// should be skipped as it will not be resolved
			const p5: Promise<PluginInput> = Promise.resolve({
				key: 'p5',
				name: 'P5',
				value: { routes: { name: 'P5_Route', path: 'p5' } },
			});

			await Plugins.register(p1);
			await Plugins.register(p2 as any);
			await Plugins.register(p3);
			await Plugins.register(p4);
			await Plugins.register(p5 as any);

			// Resolve so its loaded
			await Plugins.resolve('p2');

			// Disbale so it gets skipped
			await Plugins.disable('p3');

			const routes = await Plugins.getRouteMap();

			expect(routes).toMatchObject({
				p1: [
					{
						name: 'P1_Route',
						path: 'p1',
					},
				],
				p2: [
					{
						name: 'P2_Route_A',
						path: 'p2',
					},
					{
						name: 'P2_Route_B',
						path: 'p2/b',
					},
				],
			});
		});

		it('should create a routes map without plugin key as prefixs', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			const p1: PluginInput = {
				key: 'p1',
				name: 'P1',
				value: {
					routes: {
						name: 'P1_Route',
						path: '/',
					},
				},
			};

			const p2: Promise<PluginInput> = Promise.resolve({
				key: 'p2',
				name: 'P2',
				value: {
					routes: [
						{
							name: 'P2_Route_A',
							path: '',
						},
						{
							name: 'P2_Route_B',
							path: 'b',
						},
					],
				},
			});

			await Plugins.register(p1);
			await Plugins.register(p2 as any);

			// Resolve so its loaded
			await Plugins.resolve('p2');

			const routes = await Plugins.getRouteMap(false);

			expect(routes).toMatchObject({
				p1: [
					{
						name: 'P1_Route',
						path: '',
					},
				],
				p2: [
					{
						name: 'P2_Route_A',
						path: '',
					},
					{
						name: 'P2_Route_B',
						path: 'b',
					},
				],
			});
		});

		it('should create a routes map with pluginRoutePathPrefix and plugin key as prefixs', async () => {
			const BB = new BlueBase();

			BB.Configs.setValue('pluginRoutePathPrefix', 'app');
			const Plugins = new PluginRegistry(BB);

			const p1: PluginInput = {
				key: 'p1',
				name: 'P1',
				value: {
					routes: {
						name: 'P1_Route',
						path: 'b',
					},
				},
			};

			await Plugins.register(p1);

			const routes = await Plugins.getRouteMap();

			expect(routes).toMatchObject({
				p1: [
					{
						name: 'P1_Route',
						path: 'app/p1/b',
					},
				],
			});
		});
	});

	describe('.registerCollection', () => {
		it('should register an array collection', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.registerCollection([
				createPlugin({ key: 'p1', name: 'P1', routes: { name: 'P1_Route', path: 'a' } }),
				createPlugin({ key: 'p2', name: 'P2', routes: { name: 'P2_Route', path: 'b' } }),
			]);

			const item = Plugins.get('p1');
			expect((item as any).name).toBe('P1');

			const item2 = Plugins.get('p2');
			expect((item2 as any).name).toBe('P2');

			expect(Plugins.size()).toBe(2);
		});
		it('should register an empty array collection if no params are provided', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.registerCollection();

			expect(Plugins.size()).toBe(0);
		});

		it('should register an object collection', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.registerCollection({
				p1: createPlugin({ name: 'P1', routes: { name: 'P1_Route', path: 'a' } }),
				p2: createPlugin({ name: 'P2', routes: { name: 'P2_Route', path: 'b' } }),
			});

			const item = Plugins.get('p1');
			expect((item as any).name).toBe('P1');

			const item2 = Plugins.get('p2');
			expect((item2 as any).name).toBe('P2');

			expect(Plugins.size()).toBe(2);
		});

		// it('should register an object value collection', async () => {
		// 	const BB = new BlueBase();
		// 	const Plugins = new PluginRegistry(BB);

		// 	await Plugins.registerCollection({
		// 		baz: 'boo',
		// 		foo: 'bar',
		// 	});

		// 	const item = Plugins.get('foo');
		// 	expect((item as any).value).toBe('bar');

		// 	const item2 = Plugins.get('baz');
		// 	expect((item2 as any).value).toBe('boo');

		// 	expect(Plugins.size()).toBe(2);
		// });

		it('should throw an error for unknown collection format', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			try {
				await Plugins.registerCollection('boom' as any);
			} catch (error) {
				expect(error.message).toBe(
					'Could not register collection. Reason: Unknown collection type.'
				);
			}
		});

		// it('should not do anything if no param given', async () => {
		// 	const BB = new BlueBase();
		// 	const Plugins = new PluginRegistry(BB);

		// 	await Plugins.registerCollection();
		// 	expect(Plugins.size()).toBe(0);
		// });
	});

	// describe('Initialization', () => {

	// 	it('should initialize plugins', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			key: 'dummy-plugin',
	// 			meta: {
	// 				name: 'Dummy Plugin',
	// 			},
	// 			value: {
	// 				filters: {
	// 					'an.event': (val: number) => val,
	// 					'another.event': (val: number) => val,
	// 				},
	// 			},
	// 		});

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			key: 'dummy-plugin-2',
	// 			meta: {
	// 				name: 'Dummy Plugin 2',
	// 			},
	// 			value: {
	// 				filters: {
	// 					'an.event': (val: number) => val,
	// 				},
	// 			},

	// 			filters: {
	// 				'an.event': (val: number) => val,
	// 			},
	// 		});

	// 		expect(BB.Filters.size()).toBe(0);

	// 		await BB.boot();

	// 		expect(BB.Filters.get('an.event')).toHaveLength(2);
	// 		expect(BB.Filters.get('another.event')).toHaveLength(1);
	// 	});

	// 	it('should not initialize disabled plugins', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			enabled: false,
	// 			filters: {
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin',
	// 		});

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			filters: {
	// 				'an.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin2',
	// 		});

	// 		expect(BB.Filters.size()).toBe(0);

	// 		await BB.boot();

	// 		expect(BB.Filters.get('an.event')).toHaveLength(1);
	// 		expect(BB.Filters.get('another.event')).toBe(undefined);
	// 	});

	// 	it('should not initialize plugins with filters in a thunk', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			filters: () => ({
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			}),
	// 			name: 'DummyPlugin',
	// 		});

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			filters: () => ({
	// 				'an.event': (val: number) => val,
	// 			}),
	// 			name: 'DummyPlugin2',
	// 		});

	// 		expect(BB.Filters.size()).toBe(0);

	// 		await BB.boot();

	// 		expect(BB.Filters.get('an.event')).toHaveLength(2);
	// 		expect(BB.Filters.get('another.event')).toHaveLength(1);
	// 	});

	// });

	// describe('.disable method', () => {

	// 	it('should disable plugin', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			filters: {
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin',
	// 		});

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(true);

	// 		await Plugins.disable('dummy-plugin');

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(false);
	// 	});

	// });

	// describe('.enable method', () => {

	// 	it('should enable plugin', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			enabled: false,
	// 			filters: {
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin',
	// 		});

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(false);

	// 		await Plugins.enable('dummy-plugin');

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(true);
	// 	});

	// });

	// describe('.getFromSlugOrPlugin method', () => {

	// 	it('should return a plugin from a string', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			name: 'DummyPlugin',
	// 		});

	// 		expect((Plugins as any).getFromSlugOrPlugin('dummy-plugin').name).toBe('DummyPlugin');
	// 	});

	// 	it('should return a Plugin  object as is', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		const plugin = (new Plugin({
	// 			name: 'DummyPlugin',
	// 		})).setup();

	// 		expect((Plugins as any).getFromSlugOrPlugin(plugin).slug).toBe('dummy-plugin');
	// 	});

	// 	it('should throw an error for unknown Plugins', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		expect(() => (Plugins as any).getFromSlugOrPlugin('foo')).toThrow();
	// 	});

	// });
});
