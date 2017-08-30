import React from 'react';

import BR from './index';

import { SystemRouter } from './router';

import { getProvider, createStore } from './redux';

import Page from './pages/Page';
import IndexPage from './pages/IndexPage';
import FourOFourPage from './pages/404Page';
import Routes from './routes';

export default () => {

	/* Main System Component */
	BR.Components.register('BlueRainApp', () => (
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
	BR.Filters.add('bluerain.system.app', function AddReduxToSystemApp(App) {
		return withRedux(App);
	});

	// Pages
	BR.Components.register('Page', Page);
	BR.Components.register('IndexPage', IndexPage);
	BR.Components.register('404Page', FourOFourPage);
};
