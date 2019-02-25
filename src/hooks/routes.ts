import { BlueBase } from '../BlueBase';
import { HookNestedCollection } from '../registries';
import { NavigatorProps } from '../components';
import deepmerge from 'deepmerge';
import isnil from 'lodash.isnil';
import { resolveThunk } from '../utils';

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
				const navigator: NavigatorProps = {
					type: 'stack',
					initialRouteName: 'Home',
					routes: [
						{
							name: 'Home',
							path: '',
							exact: true,
							screen: 'HomeScreen',
						},
						{
							name: 'Plugins',
							path: 'p',
							exact: false,
							navigator: await BB.Hooks.run('bluebase.navigator.plugins', {} as any),
						},
					],
				};

				return deepmerge(inputNavigator, navigator);
			},
		},
	],

	/**
	 * Returns a navigator with plugin routes
	 */
	'bluebase.navigator.plugins': [
		{
			key: 'bluebase-navigator-plugins-internal-default',
			priority: 5,

			// tslint:disable-line:object-literal-sort-keys
			value: async (inputNavigator: NavigatorProps, _ctx: {}, BB: BlueBase) => {
				const pluginRoutes = [];
				for (const [key, item] of BB.Plugins.entries()) {
					const plugin = await item.value;
					if (BB.Plugins.isEnabled(key) && !isnil(plugin.route)) {
						pluginRoutes.push(resolveThunk(plugin.route));
					}
				}

				const navigator: NavigatorProps = {
					type: 'stack',
					routes: pluginRoutes,
					navigationOptions: {
						// header: null,
					},
				};

				return deepmerge(inputNavigator, navigator);
			},
		},
	],
};
