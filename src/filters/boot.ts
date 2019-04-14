import { BlueBase, BootOptions } from '../BlueBase';
import { FilterNestedCollection } from '../registries';

export const boot: FilterNestedCollection = {
	'bluebase.boot': [
		{
			key: 'bluebase-boot-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Filters.run('bluebase.boot.start', bootOptions);

				await BB.Filters.run('bluebase.configs.register', bootOptions);
				await BB.Filters.run('bluebase.assets.register', bootOptions);
				await BB.Filters.run('bluebase.fonts.register', bootOptions);
				await BB.Filters.run('bluebase.components.register', bootOptions);
				await BB.Filters.run('bluebase.filters.register', bootOptions.filters);
				await BB.Filters.run('bluebase.routes.register', bootOptions);
				await BB.Filters.run('bluebase.themes.register', bootOptions);
				await BB.Filters.run('bluebase.plugins.register', bootOptions.plugins);

				await BB.Filters.run('bluebase.plugins.initialize.all', bootOptions);

				await BB.Filters.run('bluebase.preload', bootOptions);

				await BB.Filters.run('bluebase.boot.end', bootOptions);

				return bootOptions;
			},
		},
	],

	'bluebase.boot.start': [
		{
			key: 'system-boot-start-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Filters.run('bluebase.components.register.internal', bootOptions);

				return bootOptions;
			},
		},
	],

	'bluebase.preload': [
		{
			key: 'system-preload-default',
			priority: 5,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				await BB.Fonts.load();

				return bootOptions;
			},
		},
	],
};
