import { BlueBase, BootOptions } from '../BlueBase';
import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../themes';
import { HookInput } from '../registries';

export const themes: { [key: string]: HookInput[] } = {

	'bluebase.themes.register': [{
		name: 'bluebase-components-register-internal-default',
		priority: 5,

		// tslint:disable-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Themes.register(BlueBaseLightTheme);
			await BB.Themes.register(BlueBaseDarkTheme);

			return bootOptions;
		},
	}]
};
