import kebabCase from 'lodash.kebabcase';
import isNil from 'lodash.isnil';

import MapRegistry from './MapRegistry';
import BR, { Plugin } from '../index';

/**
 * All system plugins are stored in this registry
 * @property {Map<string, Plugin>} data Storage Map of all plugins
 */
export default class PluginRegistry extends MapRegistry {
	// data: Map<string, Plugin>;

	constructor() {
		super('PluginRegistry');
	}

	/**
	 * Register a Plugin To be deprecated in 2.0.0
	 * @param {Plugin} plugin The plugin to register
	 */
	register(plugin: Plugin) {
		console.warn(
			'Deprecation Warning: "register" method of PluginRegistry has been deprecated. Please use "set" method instead.'
		);
		this.set(plugin);
	}
	/**
	 * Register a Plugin
	 * @param {Plugin} plugin The plugin to register
	 */
	// cheated here to remove ts error: set(plugin: Plugin) is not compatible with
	// set(key: string, item: any, ...rest: any[])
	set(plugin: Plugin | any) {
		if (isNil(plugin)) {
			throw new Error('No plugin provided');
		}

		if (!plugin.pluginName) {
			throw new Error('Plugin name not provided.');
		}

		if (!plugin.slug) {
			plugin.slug = plugin.pluginName;
		}

		plugin.slug = kebabCase(plugin.slug);

		super.set(plugin.slug, plugin);
	}

	/**
	 * Register many plugins at once
	 * @param {Array<Plugin>} plugins The array of plugins to register
	 */
	registerMany(plugins: Plugin[]) {
		plugins = plugins || [];

		if (!Array.isArray(plugins)) {
			throw new Error('Plugins parameter must be an Array');
		}

		plugins.forEach((plugin: Plugin) => this.set(plugin));
	}

	/**
	 * Initialize all the registered plugins
	 */
	initializeAll() {
		this.data.forEach(plugin => {
			// Add hooks from the 'hooks' static property of plugin
			if (plugin.hooks) {
				Object.keys(plugin.hooks).forEach(hook => {
					BR.Hooks.add(hook, `${plugin.slug}.${hook}`, plugin.hooks[hook]);
				});
			}

			// Add components from the 'components' static property of plugin
			if (plugin.components) {
				Object.keys(plugin.components).forEach(component => {
					BR.Components.setOrReplace(component, plugin.components[component]);
				});
			}

			// If the plugin has an initialize methid, call it
			if (plugin.initialize) {
				const config = BR.Configs.get(`plugins.${plugin.slug}`);
				plugin.config = config;
				plugin.initialize(config, BR);
			}
		});
	}
}
