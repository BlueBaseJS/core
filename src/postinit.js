import React from 'react';

import {
	// Registries
	CallbackRegistry,
	ComponentRegistry,

	// Router
	SystemRouter
} from './index';

import { getProvider, createStore } from './redux';

import Page from './pages/Page';
import IndexPage from './pages/IndexPage';
import FourOFourPage from './pages/404Page';
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
	ComponentRegistry.register('Page', Page);
	ComponentRegistry.register('IndexPage', IndexPage);
	ComponentRegistry.register('404Page', FourOFourPage);
};
