import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import { Provider } from 'react-redux';

import { createStore } from './index';

/**
 * Add Redux state management to BlueRain Apps
 * @property {string} pluginName "Redux"
 * @property {string} slug "redux"
 */
class ReduxPlugin extends Plugin {
	static pluginName = 'Redux';
	static slug = 'redux';

	static initialize(config = {}, ctx) {

		// withRedux HOC Method
		const withRedux = App => (props) => {

			ctx.Filters.run('bluerain.redux.beforeInit');
			
			const store = createStore(ctx);

			/**
			 * This plugin saves `store` object in the BlueRain context. This can be accessed in the following way:
			 *
			 * ```javascript
			 * const store = ctx.refs.store;
			 * ```
			 *
			 * @namespace
			 */
			const StoreRef = store;
			ctx.refs.store = StoreRef;

			const ReduxProvider = ctx.Filters.run('bluerain.redux.provider', Provider);
			App = ctx.Filters.run('bluerain.redux.app', App);

			return (<ReduxProvider store={store}><App {...props} /></ReduxProvider>);
		};

		// Add redux to main system app
		ctx.Filters.add('bluerain.system.app', function AddReduxToSystemApp(App) {
			return withRedux(App);
		});
	}
}

export default ReduxPlugin;
