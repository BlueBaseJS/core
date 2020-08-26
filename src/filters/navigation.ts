import { FilterNestedCollection, RouteOptions } from '../registries';
import { NavigatorProps, RouteConfig } from '@bluebase/components';

import { BlueBase } from '../BlueBase';
import deepmerge from 'deepmerge';

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
			priority: 3,

			// tslint:disable-line:object-literal-sort-keys
			value: async (inputNavigator: NavigatorProps, opts: RouteOptions, BB: BlueBase) => {
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

				const routeMap = await BB.Plugins.getRouteMap(opts);
				Object.values(routeMap).forEach(
					(routesArr: RouteConfig[]) => (mainRoutes = mainRoutes.concat(routesArr))
				);

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
