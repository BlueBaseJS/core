import { BlueBase, BootOptions } from '../BlueBase';
import { HookNestedCollection } from '../registries';
import { NavigatorProps } from '../components';
import React from 'react';
import deepmerge from 'deepmerge';

// tslint:disable:object-literal-sort-keys
export const routes: HookNestedCollection = {
	'bluebase.navigator.root': [
		{
			key: 'bluebase-navigator-root-internal-default',
			priority: 5,

			value: async (inputRoutes: NavigatorProps, _ctx: {}, _BB: BlueBase) => {

				const rootRoutes: NavigatorProps = {
					type: 'stack',
					initialRouteName: 'Root',
					// headerMode: 'none',

					routes: [{
						name: 'Root',
						path: '',
						screen: 'SystemApp',
					}]
				};

				return deepmerge(inputRoutes, rootRoutes);

			},
		},
	],


	'bluebase.navigator.main': [
		{
			key: 'bluebase-navigator-main-internal-default',
			priority: 5,

			// tslint:disable-line:object-literal-sort-keys
			value: async (_bootOptions: BootOptions, _ctx: {}, _BB: BlueBase) => {

				const mainRoutes: NavigatorProps = {
					type: 'stack',
					routes: [{
						name: 'App',
						path: '/app',
						screen: () => React.createElement('div', { children: 'Hello World' }),
					}]
				};

				return mainRoutes;

			},
		},
	],
};
