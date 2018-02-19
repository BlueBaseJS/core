import { BlueRain, JsonComponentSchema, withBlueRain } from '../../index';
import React from 'react';

/**
 * Shows system content
 */
const SystemApp = ({ bluerain: BR, ...others }: { bluerain: BlueRain }) => {
	let routes: JsonComponentSchema = {
		component: 'SystemLayout',
		props: others,
		children: [
			{
				component: 'SystemHeader'
			},
			{
				component: 'SystemContent'
			},
			{
				component: 'SystemFooter'
			}
		]
	};

	routes = BR.Filters.run('bluerain.system.app.schema', routes);
	return BR.API.JsonToReact.parse(routes);
};

export default withBlueRain(SystemApp) as React.ComponentType<any>;
