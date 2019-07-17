import { BlueBase, BootOptions } from '../BlueBase';
import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../themes';

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
				await BB.Themes.register(BlueBaseLightTheme);
				await BB.Themes.register(BlueBaseDarkTheme);

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
				await BB.Themes.registerCollection(bootOptions.themes);

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
					await BB.Themes.registerCollection(plugin.themes);
				}

				return bootOptions;
			},
		},
	],
};
