import { BlueBase, BootOptions } from '../BlueBase';

import { FilterNestedCollection } from '../registries';

export const fonts: FilterNestedCollection = {
	'bluebase.fonts.register': [
		/**
		 * Registers all fonts in the bluebase.ts
		 */
		{
			key: 'bluebase-fonts-register-default',
			priority: 3,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const keys = await BB.Fonts.registerCollection(bootOptions.fonts);
				keys.forEach((key: string) => BB.Fonts.setMeta(key, 'source', { type: 'boot' }));

				return bootOptions;
			},
		},

		/**
		 * Registers all fonts in the plugins
		 */
		{
			key: 'bluebase-fonts-register-from-plugins',
			priority: 4,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const plugins = await BB.Plugins.getAllEnabled();

				for (const plugin of plugins) {
					const keys = await BB.Fonts.registerCollection(plugin.fonts);
					keys.forEach((key: string) =>
						BB.Fonts.setMeta(key, 'source', { type: 'plugin', key: plugin.key })
					);
				}

				return bootOptions;
			},
		},
	],

	'bluebase.preload': [
		{
			key: 'system-preload-fonts-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Fonts.load();

				return bootOptions;
			},
		},
	],
};
