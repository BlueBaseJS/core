import { BlueBase, BootOptions } from '../BlueBase';
import { HookInput } from '../registries';

export const boot: { [key: string]: HookInput[] } = {

	'bluebase.boot': [{
		name: 'bluebase-boot-default',
		priority: 5,

		// tslint:disable-next-line:object-literal-sort-keys
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

		// tslint:disable-next-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Hooks.run('bluebase.components.register.internal', bootOptions);

			return bootOptions;
		}
	}],
};
