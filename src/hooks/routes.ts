import { BlueBase, BootOptions } from '../BlueBase';
import { HookNestedCollection } from '../registries';

export const routes: HookNestedCollection = {
	'bluebase.routes.root': [
		{
			key: 'bluebase-routes-root-internal-default',
			priority: 5,

			// tslint:disable-line:object-literal-sort-keys
			value: async (_bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

				const rootRoutes = {
					component: 'SystemApp',
					name: 'Root',
					navigator: 'stack',
					path: '/',
					routes: BB.Hooks.run('bluebase.routes.app', [])
				};

				return rootRoutes;

			},
		},
	],


	'bluebase.routes.app': [
		{
			key: 'bluebase-routes-app-internal-default',
			priority: 5,

			// tslint:disable-line:object-literal-sort-keys
			value: async (_bootOptions: BootOptions, _ctx: {}, _BB: BlueBase) => {

				const rootRoutes = [
					// Apps
					{
						name: 'AppsListing',
						navigator: 'switch',
						path: '/app',
						routes: [{
							name: 'SettingsAppRoutes',
							navigator: 'stack',
							path: '/app/settings',
							routes: []
						}]
					}
				];

				return rootRoutes;

			},
		},
	],
};
