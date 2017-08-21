/* @flow */

import kebabCase from 'lodash.kebabcase';

import Plugin from '../models/Plugin';
import ConfigRegistry from './ConfigRegistry';

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
			if (!plugin.pluginName) {
				throw new Error('Plugin name not provided.');
			}

			if (!plugin.slug) {
				plugin.slug = plugin.name;
			}

			plugin.slug = kebabCase(plugin.slug);

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
		const me = this;
		Object.keys(me.PluginsTable).forEach((key) => {

			const plugin = me.PluginsTable[key];
			if (plugin.initialize) {
				const config = ConfigRegistry.get(`plugins.${plugin.slug}`);
				plugin.initialize(config);
			}

		});

	}
}

const pluginRegistry = new PluginRegistry();
export default pluginRegistry;
