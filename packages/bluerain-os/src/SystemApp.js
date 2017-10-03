/* @flow */

import BR from './index';

import { parseJsonSchema } from './utils/JsonSchemaToReact';

export const SystemRoutes = () => {
	const appRoutes = BR.Apps.getComponentSchema();

	// Default Routes
	let systemRoutes = [
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

// $FlowFixMe
export default (props) => {
	BR.Filters.run('bluerain.systemlayout');
	const routes = {
		component: 'SystemLayout',
		props,
		children: [
			{
				component: 'Switch',
				props: { style: { flex: 1, flexGrow: 1 } },
				children: SystemRoutes()
			}
		]
	};

	return parseJsonSchema(BR.Filters.run('bluerain.system.app.schema', routes));
};
