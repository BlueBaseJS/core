// tslint:disable: object-literal-sort-keys
import {
	ActivityIndicator,
	Button,
	Image,
	ImageBackground,
	Picker,
	Slider,
	Switch,
	Text,
	TextInput,
	View,
} from '../native';
import { BlueBase, BootOptions } from '../BlueBase';
import {
	BlueBaseContent,
	BlueBaseFilter,
	BlueBaseImage,
	ComponentState,
	DataObserver,
	DynamicIcon,
	EmptyState,
	ErrorObserver,
	ErrorState,
	FormattedMessage,
	Header,
	HeaderBackButton,
	HeaderTitle,
	HomeScreen,
	HoverObserver,
	Link,
	LoadingState,
	Navigation,
	NavigationActions,
	Noop,
	PluginIcon,
	Redirect,
	StatefulComponent,
	TouchableItem,
	WaitObserver,
} from '../components/';
import { FilterNestedCollection } from '../registries';
import { ThemeValue } from '../themes';

export const components: FilterNestedCollection = {
	/**
	 * Registers all components that ship with BlueBase
	 */
	'bluebase.components.register.internal': [
		{
			key: 'bluebase-components-register-internal-default',
			priority: 5,

			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Components.registerCollection({
					// BlueBase Components
					BlueBaseContent,
					BlueBaseFilter,
					BlueBaseImage,
					ComponentState,
					DataObserver,
					DynamicIcon,
					EmptyState,
					ErrorObserver,
					ErrorState,
					FormattedMessage,
					Header,
					HeaderBackButton,
					HeaderTitle,
					HomeScreen,
					HoverObserver,
					Icon: Noop,
					Link,
					LoadingState,
					Navigation,
					NavigationActions,
					Noop,
					PluginIcon,
					Redirect,
					StatefulComponent,
					TouchableItem,
					WaitObserver,

					// Native
					ActivityIndicator,
					Button,
					Image,
					ImageBackground,
					Picker,
					Slider,
					Switch,
					Text,
					TextInput,
					View,

					// Typography
					H1: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.h1 }),
					},
					H2: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.h2 }),
					},
					H3: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.h3 }),
					},
					H4: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.h4 }),
					},
					H5: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.h5 }),
					},
					H6: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.h6 }),
					},
					Subtitle1: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.subtitle1 }),
					},
					Subtitle2: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.subtitle2 }),
					},
					Body1: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.body1 }),
					},
					Body2: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.body2 }),
					},
					Caption: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.caption }),
					},
					Overline: {
						value: Text,
						styles: (theme: ThemeValue) => ({ root: theme.typography.overline }),
					},
				});

				return bootOptions;
			},
		},
	],

	/**
	 * This filter registers components from bootOptions.components property.
	 * These are the components typically set in the bluebase.js file.
	 */
	'bluebase.components.register': [
		{
			key: 'bluebase-components-register-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Components.registerCollection(bootOptions.components);

				return bootOptions;
			},
		},
	],
};
