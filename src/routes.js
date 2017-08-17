// import SystemLayout from './layouts/SystemLayout.jsx';
import { runCallbacks } from './client-services/Callbacks/Callbacks';

const routes = (apps, config) => {

	const appRoutes = [];
	for (const key in apps) {
// skip loop if the property is from prototype
		if (!apps.hasOwnProperty(key)) continue;

		const app = apps[key];
		if (app.routes) {
			appRoutes.push(app.routes());
		}
	}

	const routes = {
		path: '/',
		component: SystemLayout,
		childRoutes: [
			{
				// Apps
				path: config && config.apps.routePrefix && config.apps.routePrefix || '/app', // path = /app
				childRoutes: appRoutes
			}
		]
	};

	runCallbacks('bluerain.routes', routes);

	return routes;
};

export default routes;
