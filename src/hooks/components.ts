// tslint:disable: object-literal-sort-keys
import * as Native from '../native';
import { BlueBase, BootOptions } from '../BlueBase';
import {
	BlueBaseHook,
	ComponentState,
	DataObserver,
	DynamicIcon,
	EmptyState,
	ErrorObserver,
	ErrorState,
	HoverObserver,
	JsonSchema,
	LoadingState,
	Noop,
	PluginIcon,
	StatefulComponent,
	SystemApp,
	SystemContent,
	WaitObserver
} from '../components/';
import { HookInputNestedCollection } from '../registries';
import { ThemeValue } from '../themes';


export const components: HookInputNestedCollection = {

	/**
	 * Registers all components that ship with BlueBase
	 */
	'bluebase.components.register.internal': [{
		key: 'bluebase-components-register-internal-default',
		priority: 5,

		value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Components.registerCollection({
				// BlueBase Components
				BlueBaseHook,
				ComponentState,
				DataObserver,
				DynamicIcon,
				EmptyState,
				ErrorObserver,
				ErrorState,
				HoverObserver,
				Icon: Noop,
				JsonSchema,
				LoadingState,
				Noop,
				PluginIcon,
				StatefulComponent,
				SystemApp,
				SystemContent,
				SystemFooter: Noop,
				SystemHeader: Noop,
				WaitObserver,

				// Native
				...Native,

				// Typography
				H1: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.h1 }) },
				H2: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.h2 }) },
				H3: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.h3 }) },
				H4: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.h4 }) },
				H5: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.h5 }) },
				H6: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.h6 }) },
				Subtitle1: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.subtitle1 }) },
				Subtitle2: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.subtitle2 }) },
				Body1: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.body1 }) },
				Body2: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.body2 }) },
				Caption: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.caption }) },
				Overline: { value: Native.Text, styles: (theme: ThemeValue) => ({ root: theme.typography.overline }) },
			});

			return bootOptions;
		},
	}],

	/**
	 * This hook registers components from bootOptions.components property.
	 * These are the components typically set in the bluebase.js file.
	 */
	'bluebase.components.register': [{
		key: 'bluebase-components-register-default',
		priority: 5,

		// tslint:disable-next-line:object-literal-sort-keys
		value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Components.registerCollection(bootOptions.components);

			return bootOptions;
		},
	}]
};
