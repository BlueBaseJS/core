/* @flow */

import BR from './index';

import { parseJsonSchema } from './utils/JsonSchemaToReact';

const Routes = () => {

	const appRoutes = BR.Apps.getComponentSchema();

	const routes = {
		component: 'SystemLayout',
		children: [
			{
				component: 'Switch',
				children: [
					{
						component: 'Route',
						props: {
							path: '/',
							exact: true,
							component: BR.Components.get('IndexPage')
						}
					},
					...appRoutes,
					{
						component: 'Route',
						props: {
							component: BR.Components.get('NotFoundPage')
						}
					}
				]
			}
		]
	};

	return parseJsonSchema(BR.Filters.run('bluerain.system.routes', routes));
};

export default Routes;
