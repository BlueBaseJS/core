import { BlueBase, BootOptions } from '../BlueBase';
import { HookInputNestedCollection, Plugin } from '../registries';

export const plugins: HookInputNestedCollection = {

	/**
	 * Registers given list of plugins
	 */
	'bluebase.plugins.register': [
		{
			key: 'bluebase-plugins-register-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (pluginsCollection: BootOptions['plugins'], _args: any, BB: BlueBase) => {

				await BB.Plugins.registerCollection(pluginsCollection);

				// return
				return pluginsCollection;
			}
		}
	],

	/**
	 * Initializes all ENABLED plugins in BlueBase
	 */
	'bluebase.plugins.initialize.all': [
		{
			key: 'bluebase-plugins-initialize-all-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (noop: any, _args: any, BB: BlueBase) => {

				for (const entry of BB.Plugins.entries()) {
					const plugin = entry['1'];

					if (BB.Plugins.isEnabled(plugin.key)) {
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
			key: 'bluebase-plugins-initialize-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (plugin: Plugin, _args: any, BB: BlueBase) => {

				//////////////////////////
				///// Register Hooks /////
				//////////////////////////

				await BB.Hooks.registerNestedCollection(plugin.hooks);

				///////////////////////////////
				///// Register Components /////
				///////////////////////////////

				await BB.Components.registerCollection(plugin.components);

				///////////////////////////
				///// Register Themes /////
				///////////////////////////

				await BB.Themes.registerCollection(plugin.themes);

				////////////////////////////
				///// Register Configs /////
				////////////////////////////

				let configs = plugin.defaultConfigs || {};

				// Custom input configs are already registered at this point,
				// We just want to make sure we set default configs if certain
				// configs were not given as input

				if (Object.keys(configs).length > 0) {
					const inputConfigs = BB.Configs.filter((_value, key) => plugin.hasConfig(key));
					configs = { ...configs, ...inputConfigs, };
					BB.Configs.registerCollection(configs);
				}

				///////////////////////////
				///// Register Routes /////
				///////////////////////////

				// TODO: Implement route registeration

				//////////////////////
				///// Initialize /////
				//////////////////////
				if (plugin.initialize && typeof  plugin.initialize === 'function') {
					await plugin.initialize(configs, BB);
				}

				// return
				return plugin;
			}
		}
	],
};
