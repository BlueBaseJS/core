import kebabCase from 'lodash.kebabcase';

import MapRegistry from './MapRegistry';
import BR, { Plugin } from '../index';

/**
 * All system plugins are stored in this registry
 * @property {Object} data Storage table of all plugins
 */
export default class PluginRegistry extends MapRegistry {

	data: Map<string, Plugin>;

	constructor() {
		super('PluginRegistry');
		console.log('Shiny new plugin registry');
	}

	/**
	 * Register a Plugin
	 * @param {Plugin} plugin The plugin to register
	 */
	set(plugin: Plugin) {
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

		super.set(plugin.slug, plugin);
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

		console.dir(plugins)
		plugins.forEach((plugin: Plugin) => me.set(plugin));
	}

	/**
	 * Initialize all plugins
	 */
	initializeAll() {
		for (const plugin of this.data.values()) {
			if (plugin.initialize) {
				const config = BR.Configs.get(`plugins.${plugin.slug}`);
				plugin.config = config;
				plugin.initialize(config, BR);
			}
		}
	}
}
