import { BlueBase, BootOptions } from '../BlueBase';

import { FilterNestedCollection } from '../registries';

export const plugins: FilterNestedCollection = {
	/**
	 * Registers given list of plugins
	 */
	'bluebase.plugins.register': [
		{
			key: 'bluebase-plugins-register-default',
			priority: 2,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _args: any, BB: BlueBase) => {
				const keys = await BB.Plugins.registerCollection(bootOptions.plugins);
				keys.forEach((key: string) => BB.Plugins.setMeta(key, 'source', { type: 'boot' }));

				// return
				return bootOptions;
			},
		},
	],
};
