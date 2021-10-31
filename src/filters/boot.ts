import { BlueBase, BlueBaseBootProgressCallback, BootOptions } from '../BlueBase';
import { FilterNestedCollection } from '../registries';

export const boot: FilterNestedCollection = {
	'bluebase.boot': [
		{
			key: 'bluebase-boot-default',
			priority: 3,

			// tslint:disable-next-line:object-literal-sort-keys
			value: async (
				bootOptions: BootOptions,
				{ onProgress }: { onProgress: BlueBaseBootProgressCallback },
				BB: BlueBase
			) => {
				// Start boot process
				await BB.Filters.run('bluebase.boot.start', bootOptions);
				onProgress({ progress: 40 });

				// We want to register all plugins first
				await BB.Filters.run('bluebase.plugins.register', bootOptions);
				onProgress({ progress: 44 });

				// The second most important process is to register all filters,
				// so rest of boot process maybe "hackable"
				await BB.Filters.run('bluebase.filters.register', bootOptions);
				onProgress({ progress: 48 });

				// Register configs
				await BB.Filters.run('bluebase.configs.register', bootOptions);
				onProgress({ progress: 52 });

				// Register assets
				await BB.Filters.run('bluebase.assets.register', bootOptions);
				onProgress({ progress: 56 });

				// Register assets
				await BB.Filters.run('bluebase.fonts.register', bootOptions);
				onProgress({ progress: 60 });

				// Register components
				await BB.Filters.run('bluebase.components.register', bootOptions);
				onProgress({ progress: 64 });

				// Register routes
				await BB.Filters.run('bluebase.routes.register', bootOptions);
				onProgress({ progress: 68 });

				// Register themes
				await BB.Filters.run('bluebase.themes.register', bootOptions);
				onProgress({ progress: 72 });

				// Register preload modules
				await BB.Filters.run('bluebase.preload', bootOptions);
				onProgress({ progress: 76 });

				// End boot
				await BB.Filters.run('bluebase.boot.end', bootOptions);
				onProgress({ progress: 80 });

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
