import { BlueRain, BootOptions } from '../BlueRain';
import { SystemApp } from '../components/SystemApp';
import { HookInput } from '../registries';

export const components: { [key: string]: HookInput[] } = {

	'bluerain.internal.components.register': [{
		handler: async (bootOptions: BootOptions, _ctx: {}, BR: BlueRain) => {

			await BR.Components.register('SystemApp', SystemApp);

			return bootOptions;
		},
		name: 'bluerain-internal-components-register-default',
		priority: 5,
	}]
};
