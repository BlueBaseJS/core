import { BlueBase, BootOptions } from '../BlueBase';
import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../themes';
import { HookInputNestedCollection } from '../registries';

export const themes: HookInputNestedCollection = {
	'bluebase.themes.register': [
		{
			key: 'bluebase-themes-register-internal-default',
			priority: 5,

			// tslint:disable-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Themes.register(BlueBaseLightTheme);
				await BB.Themes.register(BlueBaseDarkTheme);
				await BB.Themes.registerCollection(bootOptions.themes);

				return bootOptions;
			},
		},
	],
};
