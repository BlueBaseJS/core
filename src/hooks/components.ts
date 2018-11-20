// tslint:disable:object-literal-sort-keys
import { ActivityIndicator, Button, Image, Text, View } from '../native';
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
} from '../components';
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
				ActivityIndicator,
				Button,
				Image,
				Text,
				View,

				// Typography
				H1: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.h1 }) },
				H2: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.h2 }) },
				H3: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.h3 }) },
				H4: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.h4 }) },
				H5: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.h5 }) },
				H6: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.h6 }) },
				Subtitle1: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.subtitle1 }) },
				Subtitle2: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.subtitle2 }) },
				Body1: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.body1 }) },
				Body2: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.body2 }) },
				Caption: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.caption }) },
				Overline: { rawComponent: Text, styles: (theme: Theme) => ({ root: theme.typography.overline }) },
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
