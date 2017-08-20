/* @flow */

import { Route } from './router';

import {
	AppRegistry,
	CallbackRegistry,
	ComponentRegistry,
} from './index';

import { parseJsonSchema } from './utils/JsonSchemaToReact';

ComponentRegistry.register('Route', Route);

const Routes = () => {
	const routes = AppRegistry.getComponentSchema();
	return parseJsonSchema(CallbackRegistry.run('bluerain.routes', routes));
};

export default Routes;
