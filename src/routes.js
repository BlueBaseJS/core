/* @flow */

import {
  BlueRain,
	CallbackRegistry,
	ComponentRegistry,
} from './index';

import SystemLayout from './layouts/SystemLayout';
import { parseJsonSchema } from './utils/JsonSchemaToReact';

const Routes = () => {

	const appRoutes = BlueRain.apps.getComponentSchema();

	const routes = {
		component: SystemLayout,
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
							component: ComponentRegistry.get('404Page')
						}
					}
				]
			}
		]
	};

	return parseJsonSchema(CallbackRegistry.run('bluerain.system.routes', routes));
};

export default Routes;
