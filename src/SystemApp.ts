import { BlueRain, JsonComponentSchema, withBlueRain } from './index';
import React from 'react';

export const SystemRoutes = (BR: BlueRain) => {
	const appRoutes = BR.Apps.getAllRoutes();

	// Default Routes
	let systemRoutes: JsonComponentSchema[] = [
		{
			component: 'Route',
			props: {
				path: '/',
				exact: true,
				component: BR.Components.get('IndexPage')
			}
		},
		...appRoutes
	];

	// Dynamically add new routes
	systemRoutes = BR.Filters.run('bluerain.system.routes', systemRoutes);

	// Add 404 at the end
	systemRoutes.push({
		component: 'Route',
		props: {
			component: BR.Components.get('NotFoundPage')
		}
	});

	return systemRoutes;
};

const SystemApp = (props: { bluerain: BlueRain }) => {
	const BR = props.bluerain;

	let routes: JsonComponentSchema = {
		component: 'SystemLayout',
		props,
		children: [
			{
				component: 'RouterSwitch',
				props: { style: { flex: 1, flexGrow: 1 } },
				children: SystemRoutes(BR)
			}
		]
	};

	routes = BR.Filters.run('bluerain.system.app.schema', routes);
	return BR.API.JsonToReact.parse(routes);
};

export default withBlueRain(SystemApp);
