import { Plugin, Platform } from '@blueeast/bluerain-os';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

import defaultConfig from './defaultConfig';
import withReactRouter from './withReactRouter';
import { Link, Route, Switch, Redirect } from './';

/**
 * React Router (v4) plugin to add routing capabilities to BlueRain Apps.
 * @property {string} pluginName "ReactRouterPlugin"
 * @property {string} slug "router"
 */
class ReactRouterPlugin extends Plugin {
	static pluginName = 'ReactRouterPlugin';
	static slug = 'router';

	static initialize(config = {}, ctx) {

		config = Object.assign({}, defaultConfig, config);
		config = ctx.Filters.run('router.config', config);

		// Create history
		const history = Platform.getType() === 'web' ? createBrowserHistory() : createMemoryHistory();

		/**
		 * This plugin saves `router` object in the BlueRain context. This can be accessed in the following way:
		 *
		 * ```javascript
		 * const router = ctx.refs.router;
		 * ```
		 *
		 * @namespace
		 * @prop {object} history React Router's history object
		 */
		const RouterRef = { history };
		ctx.refs.router = RouterRef;

		/* Register Router Components */
		ctx.Components.register('Link', Link);
		ctx.Components.register('Route', Route);
		ctx.Components.register('Switch', Switch);
		ctx.Components.register('Redirect', Redirect);

		// Add router to main system app
		ctx.Filters.add('bluerain.system.app', function AddRouterToSystemApp(App) {
			return withReactRouter(App, history, config);
		});

		// Add filters to integrate with Redux
		ctx.Filters.add(
			'bluerain.redux.reducers.bluerain',
			function ReduxRouterReducer(reducers) {
				return Object.assign(reducers, { router: routerReducer });
			}
		);

		ctx.Filters.add(
			'bluerain.redux.middlewares',
			function ReduxRouterMiddleware(middlewares) {
				middlewares.push(routerMiddleware(history));
				return middlewares;
			}
		);

	}
}

export default ReactRouterPlugin;
