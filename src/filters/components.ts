import { BlueBase, BootOptions } from '../BlueBase';
import {
	BlueBaseContent,
	BlueBaseFilter,
	BlueBaseImage,
	BlueBaseImageBackground,
	ComponentState,
	DataObserver,
	DynamicIcon,
	EmptyState,
	ErrorObserver,
	ErrorState,
	FormattedMessage,
	HomeScreen,
	HoverObserver,
	LoadingState,
	Navigation,
	NavigationActions,
	Noop,
	PluginIcon,
	StatefulComponent,
	SystemLayout,
	WaitObserver,
} from '../components/';
import {
	ActivityIndicator,
	Button,
	FlatList,
	Image,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	Switch,
	Text,
	TextInput,
	View,
} from '../native';
import { FilterNestedCollection } from '../registries';
import { Theme } from '../themes';

export const components: FilterNestedCollection = {
	'bluebase.components.register': [
		/**
		 * Registers all components that ship with BlueBase
		 */
		{
			key: 'bluebase-components-register-internal-default',
			priority: 2,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const keys = await BB.Components.registerCollection({
					// BlueBase Components
					BlueBaseContent,
					BlueBaseFilter: { applyStyles: false, value: BlueBaseFilter },
					BlueBaseImage,
					BlueBaseImageBackground,
					ComponentState,
					DataObserver,
					DynamicIcon,
					EmptyState,
					ErrorObserver,
					ErrorState,
					FormattedMessage,
					HomeScreen,
					HoverObserver,
					Icon: Noop,
					Link: { applyStyles: false, value: Noop },
					LoadingState,
					Navigation,
					NavigationActions,
					Noop: { applyStyles: false, value: Noop },
					PluginIcon,
					StatefulComponent,
					SystemLayout,
					WaitObserver,

					// Native
					ActivityIndicator: { value: ActivityIndicator },
					Button: { value: Button },
					FlatList: { value: FlatList },
					Image: { value: Image },
					ImageBackground: { value: ImageBackground },
					SafeAreaView: { applyStyles: false, value: SafeAreaView },
					ScrollView: { value: ScrollView },
					Switch: { value: Switch },
					Text: { value: Text },
					TextInput: { value: TextInput },
					View: { applyStyles: false, value: View },

					// Typography
					H1: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.h1 }),
					},
					H2: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.h2 }),
					},
					H3: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.h3 }),
					},
					H4: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.h4 }),
					},
					H5: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.h5 }),
					},
					H6: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.h6 }),
					},
					Subtitle1: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.subtitle1 }),
					},
					Subtitle2: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.subtitle2 }),
					},
					Body1: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.body1 }),
					},
					Body2: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.body2 }),
					},
					Caption: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.caption }),
					},
					Overline: {
						value: Text,
						styles: (theme: Theme) => ({ root: theme.typography.overline }),
					},
				});

				keys.forEach((key: string) => BB.Components.setMeta(key, 'source', { type: 'system' }));

				return bootOptions;
			},
		},

		/**
		 * This filter registers components from bootOptions.components property.
		 * These are the components typically set in the bluebase.js file.
		 */
		{
			key: 'bluebase-components-register-default',
			priority: 3,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const keys = await BB.Components.registerCollection(bootOptions.components);
				keys.forEach((key: string) => BB.Components.setMeta(key, 'source', { type: 'boot' }));

				return bootOptions;
			},
		},

		/**
		 * Registers all components in the plugins
		 */
		{
			key: 'bluebase-components-register-from-plugins',
			priority: 4,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				const plugins = await BB.Plugins.getAllEnabled();

				for (const plugin of plugins) {
					const keys = await BB.Components.registerCollection(plugin.components);
					keys.forEach((key: string) =>
						BB.Components.setMeta(key, 'source', { type: 'plugin', key: plugin.key })
					);
				}

				return bootOptions;
			},
		},
	],
};
