import { BlueBase, BootOptions } from '../BlueBase';
import { HookNestedCollection } from '../registries';
import { NavigatorProps } from '../components';

// tslint:disable:object-literal-sort-keys
export const routes: HookNestedCollection = {
	'bluebase.navigator.root': [
		{
			key: 'bluebase-navigator-root-internal-default',
			priority: 5,

			value: async (_bootOptions: BootOptions, _ctx: {}, _BB: BlueBase) => {

				const rootRoutes: NavigatorProps = {
					type: 'stack',
					routes: [{
						name: 'Root',
						path: '/',
						screen: 'SystemApp',
					}]
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

				// const rootRoutes = [
				// 	// Apps
				// 	{
				// 		component: 'Noop',
				// 		name: 'AppsListing',
				// 		navigator: 'switch',
				// 		path: '/app',
				// 		routes: [{
				// 			component: 'Noop',
				// 			name: 'SettingsAppRoutes',
				// 			navigator: 'stack',
				// 			path: '/app/settings',
				// 			routes: []
				// 		}]
				// 	}
				// ];

				return [];

			},
		},
	],
};
