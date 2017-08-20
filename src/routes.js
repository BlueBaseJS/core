/* @flow */

import { Route } from './router';

import {
	AppRegistry,
	CallbackRegistry,
	ComponentRegistry,
	ConfigRegistry,
} from './index';

import { parseJsonSchema } from './utils/JsonSchemaToReact';

ComponentRegistry.register('Route', Route);

const Routes = () => {

	const apps = AppRegistry.getApps();
	const appPrefix = ConfigRegistry.get('appRoutePrefix') || '/app'; // path = /app

	const appRoutes = [];
	for (const key in apps) {

		// skip loop if the property is from prototype
		if (!Object.prototype.hasOwnProperty.call(apps, key)) continue;

		const app = apps[key];
		app.appRoutePrefix = appPrefix;

		appRoutes.push({
			component: 'Route',
			props: {
				path: `${appPrefix}/${key}`,
				key,
				component: app
			}
		});
	}

	const routes = {
		component: 'div', // TODO: Change this to View with ReactXP
		children: appRoutes
	};

	return parseJsonSchema(CallbackRegistry.run('bluerain.routes', routes));
};

export default Routes;
