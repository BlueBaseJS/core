/* @flow */

import get from 'lodash.get';
import kebabCase from 'lodash.kebabcase';

import Plugin from '../models/Plugin';
import ConfigRegistry from './ConfigRegistry';

/**
 * All system plugins are stored in this registry
 * @property {Object} PluginsTable Storage table of all plugins
 */
class PluginRegistry {

	PluginsTable: { [string]: Plugin } = {};

	/**
	 * Register a Plugin
	 * @param {Plugin} plugin The plugin to register
	 */
	register(plugin: Plugin) {
		if (plugin === undefined || plugin === null) {
			throw new Error('No plugin provided');
		}

		if (!plugin.pluginName) {
			throw new Error('Plugin name not provided.');
		}

		if (!plugin.slug) {
			plugin.slug = plugin.pluginName;
		}

		plugin.slug = kebabCase(plugin.slug);

		this.PluginsTable[plugin.slug] = plugin;
	}

	/**
	 * Register many plugins at once
	 * @param {Array<Plugin>} plugins The array of plugins to register
	 */
	registerMany(plugins: Array<Plugin>) {
		const me = this;
		plugins = plugins || [];

		if (!Array.isArray(plugins)) {
			throw new Error('plugins parameter must be an Array');
		}

		plugins.forEach((plugin: Plugin) => me.register(plugin));
	}

	/**
	 * Remove a plugin from the registry
	 * @param {string} slug The slug plugin to remove
	 */
	remove(slug: string) {
		if (slug === undefined || slug === null) {
			throw new Error(`slug cannot be ${slug}`);
		}
		if (!this.PluginsTable[slug]) {
			throw new Error(`${slug} is not registered.`);
		}
		delete this.PluginsTable[slug];
	}

	/**
	 * Get a plugin
	 * @param {string} slug The slug plugin to remove
	 * @return {Plugin}
	 */
	get(slug: string) : Plugin {
		if (slug === undefined || slug === null) {
			throw new Error('No plugin slug provided');
		}

		return get(this.PluginsTable, slug);
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
				plugin.config = config;
				plugin.initialize(config);
			}

		});

	}
}

export default PluginRegistry;
