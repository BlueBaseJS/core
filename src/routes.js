import React from 'react';
import camelCase from 'lodash.camelcase';

import { Route } from 'react-router-dom';

import { runCallbacks } from './Callbacks';
import { registerComponent } from './ComponentRegistry';

registerComponent('Route', Route);

const Routes = (props) => {

	const { apps, config } = props;

	// const appRoutes = [];
	// for (const key in apps) {
	// 	// skip loop if the property is from prototype
	// 	if (!apps.hasOwnProperty(key)) continue;

	// 	let appName = camelCase(`${key}App`);
	// 	appName = appName.charAt(0).toUpperCase() + appName.slice(1);
	// 	console.log(appName);
	// 	const app = apps[key];
	// 	if (app.routes) {
	// 		appRoutes.push({
	// 			name: appName,
	// 			slug: key,
	// 			routes: app.routes
	// 		});
	// 	}
	// }

	// console.log('mapping', appRoutes.map(a => a.routes));
	// const appPrefix = config && config.apps.routePrefix && config.apps.routePrefix || '/app'; // path = /app

	// const routes = {
	// 	component: 'div',
	// 	children: [
	// 		{
	// 			// Apps
	// 			childRoutes: appRoutes
	// 		}
	// 	]
	// };

	// runCallbacks('bluerain.routes', routes);

	const renderApp = (app, slug) => {
		const AppComponent = app.routes;
		return (<AppComponent />);
	};

	return (
  <div>
    {
			Object.keys(apps).map(key => renderApp(apps[key]))
		}
  </div>
	);
};

export default Routes;
