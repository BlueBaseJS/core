/**
 * Created by umair on 8/24/17.
 */
import { Map } from 'immutable';
import BR, { Plugin } from '../../src/index';

describe('Plugin registry tests', () => {
  // tests for registering plugin
	describe('register plugin', () => {
		it('With pluginName, Plugin should be created', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'HelloPlugin';
				initialize() {}
      }
			BR.Plugins.set(HelloPlugin);
			expect(BR.Plugins.data.size).toEqual(1);
		});
		it('Without pluginName, Plugin should throw error', () => {
			class HelloPlugin extends Plugin {
				initialize() {}
      }
			expect(() => BR.Plugins.set(HelloPlugin)).toThrow(
        'Plugin name not provided.'
      );
		});
		it('slug should be abc-plugin', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug';
				initialize() {}
      }
			BR.Plugins.set(HelloPlugin);
			expect(BR.Plugins.get('with-slug').slug).toEqual('with-slug');
		});
		it('slug should be hello-world', () => {
			class HelloWorldPlugin extends Plugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
      }
			BR.Plugins.set(HelloWorldPlugin);
			expect(
          BR.Plugins.data.has('hello-world-plugin')
      ).toEqual(true);
		});
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Plugins.set(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Plugins.set(null)).toThrow();
		});
		it('slug Create other recognized static properties', () => {
			const plugin = BR.Plugins.data.get('hello-world-plugin');
			expect(plugin.slug).toEqual('hello-world-plugin');
			expect(plugin.pluginName).toEqual('HelloWorldPlugin');
		});
	});
	// plugin without extending BlueRain's Plugin component
	describe('register plugin without extending BlueRain Plugin component', () => {
		it('With pluginName, Plugin should be created', () => {
			BR.Plugins.data = Map();
			class HelloPlugin {
				static pluginName = 'HelloPlugin';
				initialize() {}
      }
			BR.Plugins.set(HelloPlugin);
			expect(BR.Plugins.data.size).toEqual(1);
		});
		it('Without pluginName, Plugin should throw error', () => {
			class HelloPlugin {
				initialize() {}
      }
			expect(() => BR.Plugins.set(HelloPlugin)).toThrow(
        'Plugin name not provided.'
      );
		});
		it('slug should be abc-plugin', () => {
			class HelloPlugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug';
				initialize() {}
      }
			BR.Plugins.set(HelloPlugin);
			expect(BR.Plugins.get('with-slug').slug).toEqual('with-slug');
		});
		it('slug should be hello-world', () => {
			class HelloWorldPlugin {
				static pluginName = 'HelloWorldPlugin';
				initialize() {}
      }
			BR.Plugins.set(HelloWorldPlugin);
			expect(
          BR.Plugins.data.has('hello-world-plugin')
      ).toEqual(true);
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
		it('should throw error b/c plugin is empty', () => {
			BR.Plugins.registerMany();
			expect(BR.Plugins.data.size).toEqual(2);
		});
		it('should throw error b/c errornous plugins', () => {
			class HelloPlugin extends Plugin {
				static pluginName = 'WithSlugPlugin';
				static slug = 'with-slug-1';
				initialize() {}
      }
			expect(() =>
        BR.Plugins.registerMany([HelloPlugin, 'string', {}])
      ).toThrow('Plugin name not provided.');
		});
		it('should have hello world plugin', () => {
			BR.Plugins.PluginsTable = {};
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
				static pluginName = 'Hello React World';
				render() {
					return <div>hello world</div>;
				}
				static initialize(config) {
					BR.Filters.add('plugin.test.initialize.hook', function abc() {
						return config + 34;
					});
				}
      }
			BR.Plugins.set(HelloReactplugin);
			BR.Plugins.initializeAll();
			expect(BR.Filters.run('plugin.test.initialize.hook')).toEqual(
        '334'
      );
		});
	});
});
