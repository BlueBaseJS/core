import { BlueRain, BootOptions } from '../BlueRain';
import { HookInput } from '../registries';
import {
	BlueRainHook,
	ComponentState,
	DynamicIcon,
	EmptyState,
	ErrorState,
	JsonSchema,
	LoadingState,
	Noop,
	PluginIcon,
	SystemApp,
	SystemContent,
} from '../components';

import { ActivityIndicator, Button, Image, Text, View } from '../native';

export const components: { [key: string]: HookInput[] } = {

	'bluerain.components.register.internal': [{
		handler: async (bootOptions: BootOptions, _ctx: {}, BR: BlueRain) => {

			// await BR.Components.register('DynamicIcon', import('../components/DynamicIcon'));
			await BR.Components.register('BlueRainHook', BlueRainHook);
			await BR.Components.register('ComponentState', ComponentState);
			await BR.Components.register('DynamicIcon', DynamicIcon);
			await BR.Components.register('EmptyState', EmptyState);
			await BR.Components.register('ErrorState', ErrorState);
			await BR.Components.register('JsonSchema', JsonSchema);
			await BR.Components.register('LoadingState', LoadingState);
			await BR.Components.register('Noop', Noop);
			await BR.Components.register('PluginIcon', PluginIcon);
			await BR.Components.register('SystemApp', SystemApp);
			await BR.Components.register('SystemContent', SystemContent);
			await BR.Components.register('SystemFooter', Noop);
			await BR.Components.register('SystemHeader', Noop);

			await BR.Components.register('ActivityIndicator', ActivityIndicator);
			await BR.Components.register('Button', Button);
			await BR.Components.register('Image', Image);
			await BR.Components.register('Text', Text);
			await BR.Components.register('View', View);

			return bootOptions;
		},
		name: 'bluerain-components-register-internal-default',
		priority: 5,
	}]
};
