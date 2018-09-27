// tslint:disable:object-literal-sort-keys
import { HookInput } from '../registries';
import { BlueRain, BootOptions } from '../BlueRain';

export const boot: { [key: string]: HookInput[] } = {

	'bluerain.boot': [{
		name: 'bluerain-boot-default',
		priority: 5,
		handler: async (bootOptions: BootOptions, _ctx: {}, BR: BlueRain) => {

			await BR.Hooks.run('bluerain.boot.start', bootOptions);

			await BR.Hooks.run('bluerain.configs.load', bootOptions);

			await BR.Hooks.run('bluerain.components.register', bootOptions);
			await BR.Hooks.run('bluerain.hooks.register', bootOptions);
			await BR.Hooks.run('bluerain.routes.register', bootOptions);
			await BR.Hooks.run('bluerain.plugins.register', bootOptions);

			await BR.Hooks.run('bluerain.plugins.initialize.all', bootOptions);

			await BR.Hooks.run('bluerain.boot.end', bootOptions);

			return bootOptions;
		}
	}],

	'bluerain.boot.start': [{
		name: 'system-initialize-default',
		priority: 5,
		handler: async (bootOptions: BootOptions, _ctx: {}, BR: BlueRain) => {

			await BR.Hooks.run('bluerain.internal.components.register', bootOptions);

			return bootOptions;
		}
	}],
};
