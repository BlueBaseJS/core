// tslint:disable:object-literal-sort-keys
import * as Component from '../components';
import * as Native from '../native';
import { BlueBase, BootOptions } from '../BlueBase';
import { HookInput } from '../registries';
import { Theme } from '../models';


export const components: { [key: string]: HookInput[] } = {

	/**
	 * Registers all components that ship with BlueBase
	 */
	'bluebase.components.register.internal': [{
		name: 'bluebase-components-register-internal-default',
		priority: 5,

		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Components.registerCollection({
				// BlueBase Components
				SystemFooter: Component.Noop,
				SystemHeader: Component.Noop,
				...Component,

				// Native
				...Native,

				// Typography
				H1: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.h1 }) },
				H2: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.h2 }) },
				H3: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.h3 }) },
				H4: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.h4 }) },
				H5: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.h5 }) },
				H6: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.h6 }) },
				Subtitle1: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.subtitle1 }) },
				Subtitle2: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.subtitle2 }) },
				Body1: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.body1 }) },
				Body2: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.body2 }) },
				Caption: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.caption }) },
				Overline: { rawComponent: Native.Text, styles: (theme: Theme) => ({ root: theme.typography.overline }) },
			});

			return bootOptions;
		},
	}],

	/**
	 * This hook registers components from bootOptions.components property.
	 * These are the components typically set in the bluebase.js file.
	 */
	'bluebase.components.register': [{
		name: 'bluebase-components-register-default',
		priority: 5,

		// tslint:disable-next-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Components.registerCollection(bootOptions.components);

			return bootOptions;
		},
	}]
};
