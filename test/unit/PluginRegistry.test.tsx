import BR, { Plugin } from '../../src/index';
import { Map } from 'immutable';

describe('Plugin registry tests', () => {
	// tests for registering plugin
	describe('register plugin', () => {
		it('slug should be hello-world', () => {
			class HelloWorldPlugin extends Plugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
			}

			BR.Plugins.add(HelloWorldPlugin);
			expect(BR.Plugins.data.has('hello-world-plugin')).toEqual(true);
		});

		it('- test overload Add method with only plugin param', () => {
			class HelloTestPlugin extends Plugin {
				static pluginName = 'HelloTestPlugin';
				initialize() {}
			}

			BR.Plugins.add(HelloTestPlugin);
			expect(BR.Plugins.data.has('hello-test-plugin')).toEqual(true);
		});
		it('- test overload Add method with key and plugin param', () => {
			class DummyPlugin extends Plugin {
				static pluginName = 'DummyPlugin';
				initialize() {}
			}
			BR.Plugins.add('DummyPlugin', DummyPlugin);
			expect(BR.Plugins.data.has('DummyPlugin')).toEqual(true);
		});

		it('should throw error b/c name is null', () => {
			class NewPlugin extends Plugin {
				static pluginName = 'NewPlugin';
				initialize() {}
			}
			// it will not throw error because first param type is not string.
			// It will be used as plugin. Second param will be ignored in  this case.
			expect(() => BR.Plugins.add(NewPlugin,'dummy')).not.toThrow(); 
		});
		it('slug Create other recognized static properties', () => {
			const plugin = BR.Plugins.data.get('hello-world-plugin');
			expect(plugin.slug).toEqual('hello-world-plugin');
			expect(plugin.pluginName).toEqual('HelloWorldPlugin');
		});
	});
	describe('- Set method', () =>  {
		it('test overload method when only plugin is passed', () =>  {
			class SetPlugin extends Plugin {
				static pluginName = 'SetPlugin';
				initialize() {}
			}

			BR.Plugins.add(SetPlugin);
			expect(BR.Plugins.data.has('set-plugin')).toEqual(true);
		});
		it('- test overload Add method when key and plugin both are passed', () => {
			class MockPlugin extends Plugin {
				static pluginName = 'MockPlugin';
				initialize() {}
			}
			BR.Plugins.add('MockPlugin', MockPlugin);
			expect(BR.Plugins.data.has('MockPlugin')).toEqual(true);
		});
	})
	// plugin without extending BlueRain's Plugin component
	describe('register plugin without extending BlueRain Plugin component', () => {
		it('With pluginName, Plugin should be created', () => {
			BR.Plugins.data = Map();
			class HelloPlugin {
				static pluginName = 'HelloPlugin';
				initialize() {}
			}
			BR.Plugins.add(HelloPlugin);
			expect(BR.Plugins.data.size).toEqual(1);
		});
		it('Without pluginName, Plugin should throw error', () => {
			class HelloPlugin {
				initialize() {}
			}
			expect(() => BR.Plugins.add(HelloPlugin)).toThrow(
				'Plugin name not provided.'
			);
		});
		it('slug should be with-slug', () => {
			class HelloPlugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug';
				initialize() {}
			}
			BR.Plugins.add(HelloPlugin);
			expect(BR.Plugins.get('with-slug').slug).toEqual('with-slug');
		});
		it('slug should be hello-world', () => {
			class HelloWorldPlugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
			}
			BR.Plugins.add(HelloWorldPlugin);
			expect(BR.Plugins.data.has('hello-world-plugin')).toEqual(true);
		});
		it('slug Create other recognized static properties', () => {
			const plugin = BR.Plugins.data.get('hello-world-plugin');
			expect(plugin.slug).toEqual('hello-world-plugin');
			expect(plugin.pluginName).toEqual('HelloWorldPlugin');
		});
	});
	describe('get Plugin', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Plugins.get(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Plugins.get(null)).toThrow();
		});
		it('should be undfined b/c plugin is not registered.', () => {
			expect(BR.Plugins.get('abc')).toBeUndefined();
		});
		it('should have Plugins', () => {
			expect(BR.Plugins.get('hello-world-plugin')).toBeDefined();
		});
	});
	describe('remove Plugin', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Plugins.remove(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Plugins.remove(null)).toThrow();
		});
		it('should throw error b/c plugin is not registered.', () => {
			expect(() => BR.Plugins.remove('abc')).toThrow();
		});
		it('should have Plugins', () => {
			BR.Plugins.remove('hello-world-plugin');
			expect(BR.Plugins.get('hello-world-plugin')).toBeUndefined();
		});
	});
	describe('register many Plugins', () => {
		it('should throw error b/c plugin is not array', () => {
			expect(() => BR.Plugins.registerMany({})).toThrow();
		});
		it('should throw error b/c plugin is string', () => {
			expect(() => BR.Plugins.registerMany('string')).toThrow();
		});
		it('should not throw error when empty array of plugins is passed to registerMany method', () => {
			BR.Plugins.registerMany([]);
			expect(BR.Plugins.data.size).toEqual(2);
		});
		it('should throw error b/c errornous plugins', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug-1';
				static hooks=['plugins'];

				initialize() {}
			}
			expect(() =>
				BR.Plugins.registerMany([HelloPlugin, 'string', {}])
			).toThrow('No plugin provided');
		});
		it('should have hello world plugin', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug-2';
				initialize() {}
			}
			class HelloWorldPlugin extends Plugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
			}
			BR.Plugins.registerMany([HelloPlugin, HelloWorldPlugin]);
			expect(BR.Plugins.data.size).toEqual(5);
		});
	});
	describe('initialize plugins', () => {
		it('should initialize all plugins', () => {
			BR.Configs.set('plugins.hello-react-world', '3');


			class HelloReactplugin extends Plugin {

				static hooks=[
					'bluerain.system.dummy'
				];
				static components=['New'];
				static pluginName = 'Hello React World';
				static slug = 'Hello React World';
				render() {
					return <div>hello world</div>;
				}
				static initialize(config) {
					BR.Filters.set('plugin.test.initialize.hook', 'plugin.test.initialize.hook', function abc() {
						return config + 34;
					});
				}
			}
			BR.Plugins.add(HelloReactplugin);
			BR.Plugins.initializeAll();
			expect(BR.Filters.run('plugin.test.initialize.hook')).toEqual('334');
		});
	});
});
