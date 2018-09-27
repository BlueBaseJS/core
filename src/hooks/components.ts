import { BlueRain, BootOptions } from '../BlueRain';
import { HookInput } from '../registries';
import { DynamicIcon, Noop, PluginIcon, SystemApp, SystemContent } from '../components';

// tslint:disable-next-line:no-var-requires
const { Text, View } = require('react-native');

export const components: { [key: string]: HookInput[] } = {

	'bluerain.components.register.internal': [{
		handler: async (bootOptions: BootOptions, _ctx: {}, BR: BlueRain) => {

			// await BR.Components.register('DynamicIcon', import('../components/DynamicIcon'));
			await BR.Components.register('DynamicIcon', DynamicIcon);
			await BR.Components.register('Noop', Noop);
			await BR.Components.register('PluginIcon', PluginIcon);
			await BR.Components.register('SystemApp', SystemApp);
			await BR.Components.register('SystemContent', SystemContent);
			await BR.Components.register('SystemFooter', Noop);
			await BR.Components.register('SystemHeader', Noop);

			await BR.Components.register('Text', Text);
			await BR.Components.register('View', View);

			return bootOptions;
		},
		name: 'bluerain-components-register-internal-default',
		priority: 5,
	}]
};
