import { BlueBase, BootOptions } from '../BlueBase';
import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../themes';
import { HookInput } from '../registries';

export const themes: { [key: string]: HookInput[] } = {

	'bluebase.themes.register': [{
		name: 'bluebase-components-register-internal-default',
		priority: 5,

		// tslint:disable-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			// TODO: Use .register method instead, as themes may be split
			BB.Themes.set('BlueBase.Light', BlueBaseLightTheme);
			BB.Themes.set('BlueBase.Dark', BlueBaseDarkTheme);
			return bootOptions;
		},
	}]
};
