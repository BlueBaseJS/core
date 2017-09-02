/* @flow */

import {
	AppRegistry,
	CallbackRegistry,
	ComponentRegistry,
} from './index';

import { parseJsonSchema } from './utils/JsonSchemaToReact';

const Routes = () => {

	const appRoutes = AppRegistry.getComponentSchema();

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
							component: ComponentRegistry.get('IndexPage')
						}
					},
					...appRoutes,
					{
						component: 'Route',
						props: {
							component: ComponentRegistry.get('NotFoundPage')
						}
					}
				]
			}
		]
	};

	return parseJsonSchema(CallbackRegistry.run('bluerain.system.routes', routes));
};

export default Routes;
