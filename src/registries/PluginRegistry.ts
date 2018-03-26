import { BlueRain, Plugin } from '../index';
import { EsModule, MaybeEsModule } from '../typings';
import MapRegistry from './MapRegistry';
import isNil from 'lodash.isnil';
import kebabCase from 'lodash.kebabcase';

/**
 * All system plugins are stored in this registry
 * @property {Map<string, Plugin>} data Storage Map of all plugins
 */
export default class PluginRegistry extends MapRegistry<Plugin> {
	constructor(private BR: BlueRain) {
		super('PluginRegistry');
	}

	/**
	 * Register an Plugin
	 * @param {Plugin} plugin The BlueRain plugin to register
	 */
	add(key: string, plugin: MaybeEsModule<Plugin>): void;
	add(plugin: MaybeEsModule<Plugin>): void;
	add(key: string | MaybeEsModule<Plugin>, plugin?: MaybeEsModule<Plugin>) {
		const { key: k, plugin: a } = this.getKeyAndItem(key, plugin);
		super.add(k, a);
	}

	/**
	 * Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	set(key: string, plugin: MaybeEsModule<Plugin>): void;
	set(plugin: MaybeEsModule<Plugin>): void;
	set(key: string | MaybeEsModule<Plugin>, plugin?: MaybeEsModule<Plugin>) {
		const { key: k, plugin: a } = this.getKeyAndItem(key, plugin);
		this.data = this.data.set(k, a);
	}

	/**
	 * Register many plugins at once
	 * @param {Array<Plugin>} plugins The BlueRain plugins to register
	 */
	registerMany(plugins: Array<MaybeEsModule<Plugin>>) {
		plugins = plugins || [];
		if (!Array.isArray(plugins)) {
			throw new Error(
				'Plugins parameter while registering via "registerMany" method must be an array'
			);
		}

		plugins.forEach(plugin => this.set(plugin));
	}

	/**
	 * Initialize all the registered plugins
	 */
	initializeAll() {
		this.data.forEach(plugin => {
			if (!plugin) {
				return;
			}

			// Add hooks from the 'hooks' static property of plugin
			if (plugin.hooks) {
				Object.keys(plugin.hooks).forEach(hook => {
					// Satisfy TS
					if (!plugin || !plugin.hooks || !plugin.hooks[hook]) {
						return;
					}

					this.BR.Hooks.set(hook, `${plugin.slug}.${hook}`, plugin.hooks[hook]);
				});
			}

			// Add components from the 'components' static property of plugin
			if (plugin.components) {
				Object.keys(plugin.components).forEach(component => {
					// Satisfy TS
					if (!plugin || !plugin.components || !plugin.components[component]) {
						return;
					}

					this.BR.Components.set(component, plugin.components[component]);
					this.BR.Components.setSource(component, {
						type: 'plugin',
						slug: this.createSlug(plugin)
					});
				});
			}

			// If the plugin has an initialize methid, call it
			if (plugin.initialize) {
				const config = this.BR.Configs.get(`plugins.${plugin.slug}`);
				plugin.config = config;
				plugin.initialize(config, this.BR);
			}
		});
	}

	/**
	 * Returns a plugin slug, or generates one
	 *
	 * @param {Plugin} plugin
	 * @returns {string}
	 */
	createSlug(plugin: Plugin): string {
		return kebabCase(plugin.slug ? plugin.slug : plugin.pluginName);
	}

	/**
	 * Takes an plugin, adds necessary fields and returns the processed plugin with a key
	 * @param key
	 * @param plugin
	 */
	private getKeyAndItem(
		key: string | MaybeEsModule<Plugin>,
		plugin?: MaybeEsModule<Plugin>
	): { key: string; plugin: Plugin } {
		if (typeof key !== 'string' && !isNil(key)) {
			plugin = key as Plugin;
			key = '';
		}

		if (!plugin) {
			throw new Error('No plugin provided');
		}

		// ES modules
		plugin = (plugin as EsModule<Plugin>).default ? (plugin as EsModule<Plugin>).default : plugin;

		// Casting, to remove possiblity of undefined value is TS.
		plugin = plugin as Plugin;

		if (!plugin.pluginName) {
			throw new Error('Plugin name not provided.');
		}

		const slug = this.createSlug(plugin);

		plugin.slug = slug;

		const strKey = key && typeof key === 'string' ? key : slug;
		return { key: strKey, plugin };
	}
}
