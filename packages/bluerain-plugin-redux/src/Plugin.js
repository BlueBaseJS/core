import React from 'react';
import BR from '@blueeast/bluerain-os';
import { Provider } from 'react-redux';

import { createStore } from './index';

class ReduxPlugin extends BR.Plugin {
	static pluginName = 'Redux';
	static slug = 'redux';

	static initialize(config = {}, ctx) {

		const store = createStore(ctx);
		const ReduxProvider = ctx.Filters.run('bluerain.redux.provider', Provider);

		// withRedux HOC Method
		const withRedux = App => props => (
		<ReduxProvider store={store}>
			<App {...props} />
		</ReduxProvider>
		);

		// Add redux to main system app
		ctx.Filters.add('bluerain.system.app', function AddReduxToSystemApp(App) {
			return withRedux(App);
		});
	}
}

export default ReduxPlugin;
