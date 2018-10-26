// tslint:disable:object-literal-sort-keys
import { HookInput } from '../registries';
import { BlueBase, BootOptions } from '../BlueBase';

export const boot: { [key: string]: HookInput[] } = {

	'bluebase.boot': [{
		name: 'bluebase-boot-default',
		priority: 5,
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Hooks.run('bluebase.boot.start', bootOptions);

			await BB.Hooks.run('bluebase.configs.load', bootOptions);

			await BB.Hooks.run('bluebase.components.register', bootOptions);
			await BB.Hooks.run('bluebase.hooks.register', bootOptions.hooks);
			await BB.Hooks.run('bluebase.routes.register', bootOptions);
			await BB.Hooks.run('bluebase.plugins.register', bootOptions.plugins);

			await BB.Hooks.run('bluebase.plugins.initialize.all', bootOptions);

			await BB.Hooks.run('bluebase.boot.end', bootOptions);

			return bootOptions;
		}
	}],

	'bluebase.boot.start': [{
		name: 'system-initialize-default',
		priority: 5,
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Hooks.run('bluebase.components.register.internal', bootOptions);

			return bootOptions;
		}
	}],
};
