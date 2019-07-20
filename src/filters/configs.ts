import { BlueBase, BootOptions } from '../BlueBase';

import { BlueBaseDefaultConfigs } from '../Configs';
import { FilterNestedCollection } from '../registries';

export const configs: FilterNestedCollection = {
	'bluebase.configs.register': [
		/**
		 * Registers all configs that ship with BlueBase
		 */
		{
			key: 'bluebase-configs-register-internal-default',
			priority: 2,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Configs.registerCollection(BlueBaseDefaultConfigs);

				return bootOptions;
			},
		},

		/**
		 * Registers all configs in the bluebase.ts
		 */
		{
			key: 'bluebase-configs-register-default',
			priority: 3,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Configs.registerCollection(bootOptions.configs);

				return bootOptions;
			},
		},

		/**
		 * Registers all default configs in the plugins
		 */
		{
			key: 'bluebase-configs-register-from-plugins',
			priority: 4,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const plugins = await BB.Plugins.getAllEnabled();

				for (const plugin of plugins) {
					// Custom input configs are already registered at this point,
					// We just want to make sure we set default configs if certain
					// configs were not given as input

					BB.Configs.registerCollectionIfNotExists(plugin.defaultConfigs);
				}

				return bootOptions;
			},
		},

		/**
		 * Sets paths for enabled plugins
		 */
		{
			key: 'bluebase-configs-set-plugin-paths',
			priority: 10,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const plugins = await BB.Plugins.getAllEnabled();

				for (const plugin of plugins) {
					BB.Plugins.setMeta(plugin.key, 'path', BB.Plugins.createPath(plugin));
				}

				return bootOptions;
			},
		},
	],
};
