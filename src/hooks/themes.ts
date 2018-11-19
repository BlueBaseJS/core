import { BlueBase, BootOptions } from '../BlueBase';
import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../themes';
import { HookInput } from '../registries';
import deepmerge  from 'deepmerge';

export const themes: { [key: string]: HookInput[] } = {

	'bluebase.themes.register': [{
		name: 'bluebase-components-register-internal-default',
		priority: 5,

		// tslint:disable-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Themes.register(deepmerge(BlueBaseLightTheme, bootOptions.theme));
			await BB.Themes.register(deepmerge(BlueBaseDarkTheme, bootOptions.theme));

			return bootOptions;
		},
	}]
};
