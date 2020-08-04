import { BlueBase, BootOptions } from '../BlueBase';

import { BlueBaseTheme } from '../themes';
import { FilterNestedCollection } from '../registries';

export const themes: FilterNestedCollection = {
	'bluebase.themes.register': [
		/**
		 * Registers all themes that ship with BlueBase
		 */
		{
			key: 'bluebase-themes-register-internal-default',
			priority: 2,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const keys = await BB.Themes.registerCollection([BlueBaseTheme]);
				keys.forEach((key: string) => BB.Themes.setMeta(key, 'source', { type: 'system' }));

				return bootOptions;
			},
		},

		/**
		 * Registers all themes in the bluebase.ts
		 */
		{
			key: 'bluebase-themes-register-default',
			priority: 3,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const keys = await BB.Themes.registerCollection(bootOptions.themes);
				keys.forEach((key: string) => BB.Themes.setMeta(key, 'source', { type: 'boot' }));

				return bootOptions;
			},
		},

		/**
		 * Registers all themes in the plugins
		 */
		{
			key: 'bluebase-themes-register-from-plugins',
			priority: 4,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const plugins = await BB.Plugins.getAllEnabled();

				for (const plugin of plugins) {
					const keys = await BB.Themes.registerCollection(plugin.themes);
					keys.forEach((key: string) =>
						BB.Themes.setMeta(key, 'source', { type: 'plugin', key: plugin.key })
					);
				}

				return bootOptions;
			},
		},
	],
};
