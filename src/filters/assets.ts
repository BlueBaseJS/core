import { BlueBase, BootOptions } from '../BlueBase';
import { FilterNestedCollection } from '../registries';

export const assets: FilterNestedCollection = {
	/**
	 * Registers all assets that ship with BlueBase
	 */
	'bluebase.assets.register.internal': [
		{
			key: 'bluebase-assets-register-internal-default',
			priority: 5,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Assets.registerCollection({
					Logo: require('../../assets/common/logo.png'),
					LogoSquare: require('../../assets/common/logo.png'),
				});

				return bootOptions;
			},
		},
	],

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
