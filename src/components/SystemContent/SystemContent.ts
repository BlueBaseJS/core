import { BlueRain, JsonComponentSchema, withBlueRain } from '../../index';
import React from 'react';
import moize from 'moize';

/**
 * Shows system content
 */
const SystemContent = ({ bluerain: BR }: { bluerain: BlueRain }) => {
	const appRoutes = BR.Apps.getAllRoutes();
	// Default Routes
	let systemRoutes: JsonComponentSchema[] = [
		{
			component: 'Route',
			props: {
				path: '/',
				exact: true,
				component: BR.Components.IndexPage
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
			component: BR.Components.NotFoundPage
		}
	});

	const schema = {
		component: 'RouterSwitch',
		props: { style: { flex: 1, flexGrow: 1 } },
		children: systemRoutes
	};

	return BR.API.JsonToReact.parse(schema);
};
const MoisedSystemContent = moize.react(SystemContent);

export default withBlueRain(MoisedSystemContent) as React.ComponentType<any>;
