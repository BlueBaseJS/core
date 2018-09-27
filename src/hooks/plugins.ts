// tslint:disable:object-literal-sort-keys
import { Plugin } from '../models/Plugin';
import { BlueRain, BootOptions } from '../BlueRain';
import { HookInput } from '../registries';

export const plugins: { [key: string]: HookInput[] } = {

	/**
	 * Registers given list of plugins
	 */
	'bluerain.plugins.register': [
		{
			name: 'bluerain.plugins.register.default',
			priority: 5,
			handler: async (pluginsArr: BootOptions['plugins'], _args: any, BR: BlueRain) => {

				for (const plugin of pluginsArr) {
					await BR.Plugins.register(plugin);
				}

				// return
				return plugins;
			}
		}
	],

	/**
	 * Initializes all ENABLED plugins in BlueRain
	 */
	'bluerain.plugins.initialize.all': [
		{
			name: 'bluerain.plugins.initialize.all.default',
			priority: 5,
			handler: async (noop: any, _args: any, BR: BlueRain) => {

				for (const entry of BR.Plugins.entries()) {
					const plugin = entry['1'];

					if (plugin.isEnabled()) {
						await BR.Hooks.run('bluerain.plugins.initialize', plugin);
					}
				}

				// return
				return noop;
			}
		}
	],

	/**
	 * Initializes a single plugin in BlueRain
	 */
	'bluerain.plugins.initialize': [
		{
			name: 'bluerain.plugins.initialize.default',
			priority: 5,
			handler: async (plugin: Plugin, _args: any, BR: BlueRain) => {

				// Register plugin hooks
				await BR.Hooks.registerCollection(
					plugin.hooks,
					(hookName: string, index: number) => `${plugin.slug}.${hookName}.${index}`
				);

				// Register components
				const componentKeys = Object.keys(plugin.components);
				for (const key of componentKeys) {
					await BR.Components.register(key, plugin.components[key]);
				}

				// TODO: Register routes

				// Initialize plugin
				// TODO: Fix configs injection
				await plugin.initialize({}, BR);

				// return
				return plugin;
			}
		}
	],
};
