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


export const components: { [key: string]: HookInput[] } = {

	/**
	 * Registers all components that ship with BlueBase
	 */
	'bluebase.components.register.internal': [{
		name: 'bluebase-components-register-internal-default',
		priority: 5,

		// tslint:disable-next-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Components.registerCollection({
				BlueBaseHook,
				ComponentState,
				DynamicIcon,
				EmptyState,
				ErrorState,
				Icon: Noop,
				JsonSchema,
				LoadingState,
				Noop,
				PluginIcon,
				SystemApp,
				SystemContent,
				SystemFooter: Noop,
				SystemHeader: Noop,
				Wait,

				ActivityIndicator,
				Button,
				Image,
				Text,
				View,
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
