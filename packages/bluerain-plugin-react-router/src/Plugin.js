import React from 'react';
import { Plugin, Platform } from '@blueeast/bluerain-os';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

import { Link, Route, Switch, Redirect } from './';

class ReactRouterPlugin extends Plugin {
	static pluginName = 'ReactRouterPlugin';
	static slug = 'router';

	static initialize(config = {}, ctx) {

		// Create history
		const history = Platform.getType() === 'web' ? createBrowserHistory() : createMemoryHistory();
		ctx.router = {};
		ctx.router.history = history;

		console.log('Platform.getType()', Platform.getType())
		console.log('historyu', history)
		/* Register Router Components */
		ctx.Components.register('Link', Link);
		ctx.Components.register('Route', Route);
		ctx.Components.register('Switch', Switch);
		ctx.Components.register('Redirect', Redirect);

		// Add router to main system app
		const withRouter = App => (props) => {
			return (<ConnectedRouter history={history}><App {...props} /></ConnectedRouter>);
		};

		ctx.Filters.add('bluerain.system.app', function AddRouterToSystemApp(App) {
			return withRouter(App);
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
