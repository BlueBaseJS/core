import { NavigatorProps, RouteConfig, StackRouteConfig } from '@bluebase/components';
import deepmerge from 'deepmerge';

import { BlueBase } from '../BlueBase';
import { FilterNestedCollection, RouteOptions } from '../registries';

// tslint:disable:object-literal-sort-keys
export const navigation: FilterNestedCollection = {
	'bluebase.navigator.root': [
		{
			key: 'bluebase-navigator-root-internal-default',
			priority: 3,

			value: async (inputNavigator: NavigatorProps, opts: RouteOptions, BB: BlueBase) => {
				const navigator: NavigatorProps = {
					type: 'switch',
					initialRouteName: 'Root',

					routes: [
						{
							name: 'Root',
							path: '',
							screen: 'SystemLayout',
							navigator: await BB.Filters.run('bluebase.navigator.main', {} as any, opts),
							options: {
								header: null,
							},
						},
					],
				};

				return deepmerge(inputNavigator as any, navigator);
			},
		},
	],

	'bluebase.navigator.main': [
		{
			key: 'bluebase-navigator-main-internal-default',
			priority: 3,

			// tslint:disable-line:object-literal-sort-keys
			value: async (inputNavigator: NavigatorProps, opts: RouteOptions, BB: BlueBase) => {
				let mainRoutes: StackRouteConfig[] = [
					{
						name: 'Home',
						path: '',
						exact: true,
						screen: 'HomeScreen',
						options: {
							// headerLeft: null,
							title: BB.Configs.getValue('title'),
						},
					},
				];

				const routeMap = await BB.Plugins.getRouteMap(opts);
				Object.values(routeMap).forEach(
					(routesArr: RouteConfig[]) => (mainRoutes = mainRoutes.concat(routesArr as any))
				);

				const navigator: NavigatorProps = {
					type: 'stack',
					initialRouteName: 'Home',
					routes: mainRoutes,
				};

				return deepmerge(inputNavigator as any, navigator);
			},
		},
	],
};
