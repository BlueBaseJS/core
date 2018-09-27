import { BlueRain, JsonComponentSchema, withBlueRain } from '../../index';
import React from 'react';
import withGlobal from './withGlobal';

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

const withBluerainComponent = withBlueRain(SystemApp) as React.ComponentType<any>;

const _SystemApp =
	process.env.NODE_ENV === 'production' ? withBluerainComponent : withGlobal(withBluerainComponent);

export default _SystemApp;
