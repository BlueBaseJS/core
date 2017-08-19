/* @flow */

import { Route } from 'react-router-dom';

import AppRegistry from './registries/AppRegistry';
import CallbackRegistry from './registries/CallbackRegistry';
import ComponentRegistry from './registries/ComponentRegistry';
import ConfigRegistry from './registries/ConfigRegistry';
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
		const component = app.getComponent();

		if (component) {
			appRoutes.push({
				component: 'Route',
				props: {
					path: `${appPrefix}/${key}`,
					key,
					component
				}
			});
		}
	}

	const routes = {
		component: 'div', // TODO: Change this to View with ReactXP
		children: appRoutes
	};

	return parseJsonSchema(CallbackRegistry.run('bluerain.routes', routes));
};

export default Routes;
