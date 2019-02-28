import { NavigatorProps, RouteConfig } from '../components';
import { BlueBase } from '../BlueBase';
import { HookNestedCollection } from '../registries';
import deepmerge from 'deepmerge';

// tslint:disable:object-literal-sort-keys
export const routes: HookNestedCollection = {
	'bluebase.navigator.root': [
		{
			key: 'bluebase-navigator-root-internal-default',
			priority: 5,

			value: async (inputNavigator: NavigatorProps, _ctx: {}, BB: BlueBase) => {
				const navigator: NavigatorProps = {
					type: 'stack',
					initialRouteName: 'Root',

					routes: [
						{
							name: 'Root',
							path: '',
							navigator: await BB.Hooks.run('bluebase.navigator.main', {} as any),
							navigationOptions: {
								header: null,
							},
						},
					],
				};

				return deepmerge(inputNavigator, navigator);
			},
		},
	],

	'bluebase.navigator.main': [
		{
			key: 'bluebase-navigator-main-internal-default',
			priority: 5,

			// tslint:disable-line:object-literal-sort-keys
			value: async (inputNavigator: NavigatorProps, _ctx: {}, BB: BlueBase) => {
				let mainRoutes: RouteConfig[] = [
					{
						name: 'Home',
						path: '',
						exact: true,
						screen: 'HomeScreen',
						navigationOptions: {
							headerLeft: null,
							title: BB.Configs.getValue('title'),
						},
					},
				];

				const routeMap = BB.Plugins.getRouteMap();
				Object.values(routeMap).forEach(routesArr => (mainRoutes = mainRoutes.concat(routesArr)));

				const navigator: NavigatorProps = {
					type: 'stack',
					initialRouteName: 'Home',
					routes: mainRoutes,
				};

				return deepmerge(inputNavigator, navigator);
			},
		},
	],
};
