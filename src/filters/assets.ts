import { BlueBase, BootOptions } from '../BlueBase';
import { FilterNestedCollection } from '../registries';

export const assets: FilterNestedCollection = {
	'bluebase.assets.register': [
		{
			key: 'bluebase-assets-register-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Assets.registerCollection(bootOptions.assets);

				return bootOptions;
			},
		},
	],
};
