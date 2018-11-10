import { BlueBase, BootOptions } from '../BlueBase';
import { HookInput } from '../registries';
import { Plugin } from '../models/Plugin';

export const plugins: { [key: string]: HookInput[] } = {

	/**
	 * Registers given list of plugins
	 */
	'bluebase.plugins.register': [
		{
			name: 'bluebase.plugins.register.default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			handler: async (pluginsArr: BootOptions['plugins'], _args: any, BB: BlueBase) => {

				for (const plugin of pluginsArr) {
					await BB.Plugins.register(plugin);
				}

				// return
				return plugins;
			}
		}
	],

	/**
	 * Initializes all ENABLED plugins in BlueBase
	 */
	'bluebase.plugins.initialize.all': [
		{
			name: 'bluebase.plugins.initialize.all.default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			handler: async (noop: any, _args: any, BB: BlueBase) => {

				for (const entry of BB.Plugins.entries()) {
					const plugin = entry['1'];

					if (plugin.isEnabled()) {
						await BB.Hooks.run('bluebase.plugins.initialize', plugin);
					}
				}

				// return
				return noop;
			}
		}
	],

	/**
	 * Initializes a single plugin in BlueBase
	 */
	'bluebase.plugins.initialize': [
		{
			name: 'bluebase.plugins.initialize.default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			handler: async (plugin: Plugin, _args: any, BB: BlueBase) => {

				// Register plugin hooks
				await BB.Hooks.registerCollection(
					plugin.hooks,
					(hookName: string, index: number) => `${plugin.slug}.${hookName}.${index}`
				);

				// Register components
				const componentKeys = Object.keys(plugin.components);
				for (const key of componentKeys) {
					await BB.Components.register(key, plugin.components[key]);
				}

				// TODO: Register routes

				// Initialize plugin
				// TODO: Fix configs injection
				await plugin.initialize({}, BB);

				// return
				return plugin;
			}
		}
	],
};
