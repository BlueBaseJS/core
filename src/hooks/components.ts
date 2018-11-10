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

	'bluebase.components.register.internal': [{
		name: 'bluebase-components-register-internal-default',
		priority: 5,

		// tslint:disable-next-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			// await BB.Components.register('DynamicIcon', import('../components/DynamicIcon'));
			await BB.Components.register('BlueBaseHook', BlueBaseHook);
			await BB.Components.register('ComponentState', ComponentState);
			await BB.Components.register('DataObserver', DataObserver);
			await BB.Components.register('DynamicIcon', DynamicIcon);
			await BB.Components.register('EmptyState', EmptyState);
			await BB.Components.register('ErrorObserver', ErrorObserver);
			await BB.Components.register('ErrorState', ErrorState);
			await BB.Components.register('Icon', Noop);
			await BB.Components.register('HoverObserver', HoverObserver);
			await BB.Components.register('JsonSchema', JsonSchema);
			await BB.Components.register('LoadingState', LoadingState);
			await BB.Components.register('Noop', Noop);
			await BB.Components.register('PluginIcon', PluginIcon);
			await BB.Components.register('StatefulComponent', StatefulComponent);
			await BB.Components.register('SystemApp', SystemApp);
			await BB.Components.register('SystemContent', SystemContent);
			await BB.Components.register('SystemFooter', Noop);
			await BB.Components.register('SystemHeader', Noop);
			await BB.Components.register('WaitObserver', WaitObserver);

			await BB.Components.register('ActivityIndicator', ActivityIndicator);
			await BB.Components.register('Button', Button);
			await BB.Components.register('Image', Image);
			await BB.Components.register('Text', Text);
			await BB.Components.register('View', View);

			return bootOptions;
		},
	}]
};
