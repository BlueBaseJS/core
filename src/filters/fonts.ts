import { BlueBase, BootOptions } from '../BlueBase';
import { FilterNestedCollection } from '../registries';

export const fonts: FilterNestedCollection = {
	'bluebase.fonts.register': [
		{
			key: 'bluebase-fonts-register-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Fonts.registerCollection(bootOptions.fonts);

				return bootOptions;
			},
		},
	],
};
