import { BlueBase, BootOptions } from '../BlueBase';

import { FilterNestedCollection } from '../registries';

export const filters: FilterNestedCollection = {
	'bluebase.filters.register': [
		/**
		 * Registers all filters in the bluebase.ts
		 */
		{
			key: 'bluebase-filters-register-default',
			priority: 3,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Filters.registerNestedCollection(bootOptions.filters);

				return bootOptions;
			},
		},

		/**
		 * Registers all filters in the plugins
		 */
		{
			key: 'bluebase-filters-register-from-plugins',
			priority: 4,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const plugins = BB.Plugins.getAllEnabled();

				for (const plugin of plugins) {
					await BB.Filters.registerNestedCollection(plugin.filters);
				}

				return bootOptions;
			},
		},
	],
};
