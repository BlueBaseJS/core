import React from 'react';

import {
	// Registries
	CallbackRegistry,
	ComponentRegistry,

	// Router
	SystemRouter
} from './index';

import { getProvider, createStore } from './redux';

import IndexPage from './layouts/IndexPage';
import Routes from './routes';

export default () => {

	/* Main System Component */
	ComponentRegistry.register('BlueRainApp', () => (
  <SystemRouter>
    <Routes />
  </SystemRouter>
	));

	const store = createStore();
	const ReduxProvider = getProvider();

	// withRedux HOC Method
	const withRedux = App => props => (
  <ReduxProvider store={store}>
    <App {...props} />
  </ReduxProvider>
	);

	// Add redux to main system app
	CallbackRegistry.add('bluerain.system.app', function AddReduxToSystemApp(App) {
		return withRedux(App);
	});

	// Pages
	ComponentRegistry.register('IndexPage', IndexPage);
};
