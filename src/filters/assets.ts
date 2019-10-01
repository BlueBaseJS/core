import { BlueBase, BootOptions } from '../BlueBase';

import { FilterNestedCollection } from '../registries';

export const assets: FilterNestedCollection = {
	'bluebase.assets.register': [
		/**
		 * Registers all assets that ship with BlueBase
		 */
		{
			key: 'bluebase-assets-register-internal-default',
			priority: 2,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const keys = await BB.Assets.registerCollection({
					Logo: require('../../assets/common/logo.png'),
					LogoSquare: require('../../assets/common/logo.png'),
				});

				keys.forEach(key => BB.Assets.setMeta(key, 'source', { type: 'system' }));

				return bootOptions;
			},
		},

		/**
		 * Registers all assets in the bluebase.ts
		 */
		{
			key: 'bluebase-assets-register-default',
			priority: 3,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const keys = await BB.Assets.registerCollection(bootOptions.assets);

				keys.forEach(key => BB.Assets.setMeta(key, 'source', { type: 'boot' }));
				return bootOptions;
			},
		},

		/**
		 * Registers all assets in the plugins
		 */
		{
			key: 'bluebase-assets-register-from-plugins',
			priority: 4,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const plugins = await BB.Plugins.getAllEnabled();

				for (const plugin of plugins) {
					const keys = await BB.Assets.registerCollection(plugin.assets);
					keys.forEach(key =>
						BB.Assets.setMeta(key, 'source', { type: 'plugin', key: plugin.key })
					);
				}

				return bootOptions;
			},
		},
	],
};
