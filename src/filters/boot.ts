import { BlueBase, BootOptions } from '../BlueBase';

import { FilterNestedCollection } from '../registries';

export const boot: FilterNestedCollection = {
	'bluebase.boot': [
		{
			key: 'bluebase-boot-default',
			priority: 3,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				// Start boot process
				await BB.Filters.run('bluebase.boot.start', bootOptions);

				// We want to register all plugins first
				await BB.Filters.run('bluebase.plugins.register', bootOptions);

				// The second most important process is to register all filters,
				// so rest of boot process maybe "hackable"
				await BB.Filters.run('bluebase.filters.register', bootOptions);

				// Register configs
				await BB.Filters.run('bluebase.configs.register', bootOptions);

				// Register assets
				await BB.Filters.run('bluebase.assets.register', bootOptions);

				// Register assets
				await BB.Filters.run('bluebase.fonts.register', bootOptions);

				// Register components
				await BB.Filters.run('bluebase.components.register', bootOptions);

				// Register routes
				await BB.Filters.run('bluebase.routes.register', bootOptions);

				// Register themes
				await BB.Filters.run('bluebase.themes.register', bootOptions);

				// Register preload modules
				await BB.Filters.run('bluebase.preload', bootOptions);

				// End boot
				await BB.Filters.run('bluebase.boot.end', bootOptions);

				return bootOptions;
			},
		},
	],

	'bluebase.reset': [
		{
			key: 'bluebase-reset-default',
			priority: 3,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {
				BB.Assets.clear();
				BB.Components.clear();
				BB.Configs.clear();
				BB.Filters.clear();
				BB.Fonts.clear();
				BB.Plugins.clear();
				BB.Themes.clear();

				return bootOptions;
			},
		},
	],
};
