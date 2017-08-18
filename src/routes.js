/* @flow */

import { Route } from 'react-router-dom';

import { runCallbacks } from './Callbacks';
import { registerComponent } from './ComponentRegistry';
import { parseJsonSchema } from './JsonSchemaToReact';

registerComponent('Route', Route);

const Routes = (props) => {

	const { apps, config } = props;

	const appPrefix = config && config.apps.routePrefix && config.apps.routePrefix || '/app'; // path = /app

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

	return parseJsonSchema(runCallbacks('bluerain.routes', routes));
};

export default Routes;
