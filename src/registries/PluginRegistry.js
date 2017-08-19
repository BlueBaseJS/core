/* @flow */

import Plugin from '../models/Plugin';

/**
 * All system plugins are stored in this registry
 * @property {Object} PluginsTable Storage table of all plugins
 */
class PluginRegistry {

	PluginsTable: {} = {};

	/**
	 * Register a Plugin
	 */
	register(plugin: Plugin) {
		if (plugin === undefined || plugin === null) {
			throw new Error('No plugin provided');
		}

		this.PluginsTable[plugin.slug] = plugin;
	}

	/**
	 * Register many plugins at once
	 */
	registerMany(plugins: Array<Plugin>) {
		const me = this;
		plugins = plugins || [];

		if (!Array.isArray(plugins)) {
			throw new Error('plugins parameter must be an Array');
		}

		plugins.forEach((plugin) => {
			me.register(plugin);
		});
	}

	/**
	 * Remove a plugin from the registry
	 */
	removePlugin(name: string) {
		if (name === undefined || name === null) {
			throw new Error(`name cannot be ${name}`);
		}
		if (!this.PluginsTable[name]) {
			throw new Error(`${name} is not registered.`);
		}
		delete this.PluginsTable[name];
	}

	/**
	 * Initialize all plugins
	 */
	initializeAll() {

		Object.keys(this.PluginsTable).forEach(function(key) {

			const plugin = this.PluginsTable[key];
			if (plugin.initialize) {
				plugin.initialize();
			}

		});

	}
}

const pluginRegistry = new PluginRegistry();
export default pluginRegistry;
