import BR, { Plugin } from '@blueeast/bluerain-os';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

class ReactRouterPlugin extends Plugin {
	static pluginName = 'ReactRouterPlugin';
	static slug = 'router';

	static initialize(config = {}, ctx) {

		// Create history
		const history = BR.Platform.getType() === 'web' ? createBrowserHistory() : createMemoryHistory();
		ctx.router = {};
		ctx.router.history = history;

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
