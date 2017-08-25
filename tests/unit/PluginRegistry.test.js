/**
 * Created by umair on 8/24/17.
 */
import PluginRegistry from '../../src/registries/PluginRegistry';
import Plugin from '../../src/models/Plugin';
import ConfigRegistry from '../../src/registries/ConfigRegistry';
import CallbackRegistry from '../../src/registries/CallbackRegistry';

describe('Plugin registry tests', () => {
  // tests for registering plugin
	describe('register plugin', () => {
		it('With pluginName, Plugin should be created', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'HelloPlugin';
				initialize() {}
      }
			PluginRegistry.register(HelloPlugin);
			expect(Object.keys(PluginRegistry.PluginsTable).length).toEqual(1);
		});
		it('Without pluginName, Plugin should throw error', () => {
			class HelloPlugin extends Plugin {
				initialize() {}
      }
			expect(() => PluginRegistry.register(HelloPlugin)).toThrow(
        'Plugin name not provided.'
      );
		});
		it('slug should be abc-plugin', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug';
				initialize() {}
      }
			PluginRegistry.register(HelloPlugin);
			expect(PluginRegistry.get('with-slug').slug).toEqual('with-slug');
		});
		it('slug should be hello-world', () => {
			class HelloWorldPlugin extends Plugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
      }
			PluginRegistry.register(HelloWorldPlugin);
			expect(
        Object.prototype.hasOwnProperty.call(
          PluginRegistry.PluginsTable,
          'hello-world-plugin'
        )
      ).toEqual(true);
		});
		it('should throw error b/c name is undefined', () => {
			expect(() => PluginRegistry.register(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => PluginRegistry.register(null)).toThrow();
		});
		it('slug Create other recognized static properties', () => {
			const plugin = PluginRegistry.PluginsTable['hello-world-plugin'];
			expect(plugin.slug).toEqual('hello-world-plugin');
			expect(plugin.pluginName).toEqual('HelloWorldPlugin');
		});
	});
	// plugin without extending BlueRain's Plugin component
	describe('register plugin without extending BlueRain Plugin component', () => {
		it('With pluginName, Plugin should be created', () => {
			PluginRegistry.PluginsTable = {};
			class HelloPlugin {
				static pluginName = 'HelloPlugin';
				initialize() {}
      }
			PluginRegistry.register(HelloPlugin);
			expect(Object.keys(PluginRegistry.PluginsTable).length).toEqual(1);
		});
		it('Without pluginName, Plugin should throw error', () => {
			class HelloPlugin {
				initialize() {}
      }
			expect(() => PluginRegistry.register(HelloPlugin)).toThrow(
        'Plugin name not provided.'
      );
		});
		it('slug should be abc-plugin', () => {
			class HelloPlugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug';
				initialize() {}
      }
			PluginRegistry.register(HelloPlugin);
			expect(PluginRegistry.get('with-slug').slug).toEqual('with-slug');
		});
		it('slug should be hello-world', () => {
			class HelloWorldPlugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
      }
			PluginRegistry.register(HelloWorldPlugin);
			expect(
        Object.prototype.hasOwnProperty.call(
          PluginRegistry.PluginsTable,
          'hello-world-plugin'
        )
      ).toEqual(true);
		});
		it('slug Create other recognized static properties', () => {
			const plugin = PluginRegistry.PluginsTable['hello-world-plugin'];
			expect(plugin.slug).toEqual('hello-world-plugin');
			expect(plugin.pluginName).toEqual('HelloWorldPlugin');
		});
	});
	describe('get Plugin', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => PluginRegistry.get(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => PluginRegistry.get(null)).toThrow();
		});
		it('should be undfined b/c plugin is not registered.', () => {
			expect(PluginRegistry.get('abc')).toBeUndefined();
		});
		it('should have Plugins', () => {
			expect(PluginRegistry.get('hello-world-plugin')).toBeDefined();
		});
	});
	describe('remove Plugin', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => PluginRegistry.remove(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => PluginRegistry.remove(null)).toThrow();
		});
		it('should throw error b/c plugin is not registered.', () => {
			expect(() => PluginRegistry.remove('abc')).toThrow();
		});
		it('should have Plugins', () => {
			PluginRegistry.remove('hello-world-plugin');
			expect(PluginRegistry.get('hello-world-plugin')).toBeUndefined();
		});
	});
	describe('register many Plugins', () => {
		it('should throw error b/c plugin is not array', () => {
			expect(() => PluginRegistry.registerMany({})).toThrow();
		});
		it('should throw error b/c plugin is string', () => {
			expect(() => PluginRegistry.registerMany('string')).toThrow();
		});
		it('should throw error b/c plugin is empty', () => {
			PluginRegistry.registerMany();
			expect(Object.keys(PluginRegistry.PluginsTable).length).toEqual(2);
		});
		it('should throw error b/c errornous plugins', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug';
				initialize() {}
      }
			expect(() =>
        PluginRegistry.registerMany([HelloPlugin, 'string', {}])
      ).toThrow('Plugin name not provided.');
		});
		it('should have hello world plugin', () => {
			PluginRegistry.PluginsTable = {};
			class HelloPlugin extends Plugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug';
				initialize() {}
      }
			class HelloWorldPlugin extends Plugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
      }
			PluginRegistry.registerMany([HelloPlugin, HelloWorldPlugin]);
			expect(Object.keys(PluginRegistry.PluginsTable).length).toEqual(2);
		});
	});
	describe('initialize plugins', () => {
		it('should initialize all plugins', () => {
			ConfigRegistry.set('plugins.hello-react-world', '3');
			class HelloReactplugin extends Plugin {
				static pluginName = 'Hello React World';
				render() {
					return <div>hello world</div>;
				}
				static initialize(config) {
					CallbackRegistry.add('plugin.test.initialize.hook', function abc() {
						return config + 34;
					});
				}
      }
			PluginRegistry.register(HelloReactplugin);
			PluginRegistry.initializeAll();
			expect(CallbackRegistry.run('plugin.test.initialize.hook')).toEqual(
        '334'
      );
		});
	});
});
