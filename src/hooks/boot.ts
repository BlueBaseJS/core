import { BlueBase, BootOptions } from '../BlueBase';
import { HookInputNestedCollection } from '../registries';

export const boot: HookInputNestedCollection = {
	'bluebase.boot': [
		{
			key: 'bluebase-boot-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Hooks.run('bluebase.boot.start', bootOptions);

				await BB.Hooks.run('bluebase.components.register', bootOptions);
				await BB.Hooks.run('bluebase.configs.register', bootOptions);
				await BB.Hooks.run('bluebase.hooks.register', bootOptions.hooks);
				await BB.Hooks.run('bluebase.routes.register', bootOptions);
				await BB.Hooks.run('bluebase.themes.register', bootOptions);
				await BB.Hooks.run('bluebase.plugins.register', bootOptions.plugins);

				await BB.Hooks.run('bluebase.plugins.initialize.all', bootOptions);

				await BB.Hooks.run('bluebase.boot.end', bootOptions);

				return bootOptions;
			},
		},
	],

	'bluebase.boot.start': [
		{
			key: 'system-initialize-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Hooks.run('bluebase.components.register.internal', bootOptions);

				return bootOptions;
			},
		},
	],
};
