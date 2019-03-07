import { BlueBase, BootOptions } from '../BlueBase';
import { FilterNestedCollection, Plugin } from '../registries';

export const plugins: FilterNestedCollection = {
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
			},
		},
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
				const enabledPlugins = BB.Plugins.filter((_value, key) => BB.Plugins.isEnabled(key));

				for (const plugin of Object.values(enabledPlugins)) {
					await BB.Filters.run('bluebase.plugins.initialize', await BB.Plugins.resolve(plugin.key));
				}

				// return
				return noop;
			},
		},
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
				///// Register Filters /////
				//////////////////////////

				await BB.Filters.registerNestedCollection(plugin.filters);

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

				// Custom input configs are already registered at this point,
				// We just want to make sure we set default configs if certain
				// configs were not given as input

				BB.Configs.registerCollectionIfNotExists(plugin.defaultConfigs);

				///////////////////////////
				///// Register Routes /////
				///////////////////////////

				// TODO: Implement route registeration

				// return
				return plugin;
			},
		},
	],
};
