/* @flow */

import { Styles } from 'reactxp';

import {
	AppRegistry,
	CallbackRegistry,
	ComponentRegistry,
} from './index';

import { parseJsonSchema } from './utils/JsonSchemaToReact';

const Routes = () => {

	const style = Styles.createViewStyle({
		width: '100%',
		height: '100%',
	}, false);

	const appRoutes = AppRegistry.getComponentSchema();

	const routes = {
		component: 'View',
		props: { style },
		children: [{
			component: 'Route',
			props: {
				path: '/',
				exact: true,
				component: ComponentRegistry.get('IndexPage')
			}
		}, appRoutes]
	};

	return parseJsonSchema(CallbackRegistry.run('bluerain.routes', routes));
};

export default Routes;
