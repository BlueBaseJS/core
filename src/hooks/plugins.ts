// tslint:disable:object-literal-sort-keys
import { Plugin } from '../models/Plugin';
import { BlueRain } from '../BlueRain';
import { HookInput } from '../registries';

export const plugins: { [key: string]: HookInput[] } = {

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

				// Register plugin hook
				await BR.Hooks.registerCollection(
					plugin.hooks,
					(hookName: string, index: number) => `${plugin.slug}.${hookName}.${index}`
				);

				// TODO: Register components
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
