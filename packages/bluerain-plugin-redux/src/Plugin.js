import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import { Provider } from 'react-redux';

import { createStore } from './index';

class ReduxPlugin extends Plugin {
	static pluginName = 'Redux';
	static slug = 'redux';

	static initialize(config = {}, ctx) {

		// withRedux HOC Method
		const withRedux = App => (props) => {
			const store = createStore(ctx);
			const ReduxProvider = ctx.Filters.run('bluerain.redux.provider', Provider);
			return (<ReduxProvider store={store}><App {...props} /></ReduxProvider>);
		};

		// Add redux to main system app
		ctx.Filters.add('bluerain.system.app', function AddReduxToSystemApp(App) {
			return withRedux(App);
		});
	}
}

export default ReduxPlugin;
