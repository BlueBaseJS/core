import React from 'react';
import RX from 'reactxp';

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
import { Link } from './router';

export default () => {

	// Broadcast Event
	CallbackRegistry.run('bluerain.preboot.start.sync');

	/* Regist ReactXP Components */
	ComponentRegistry.register('ActivityIndicator', RX.ActivityIndicator);
	ComponentRegistry.register('Button', RX.Button);
	ComponentRegistry.register('GestureView', RX.GestureView);
	ComponentRegistry.register('Image', RX.Image);
	// ComponentRegistry.register('Link', RX.Link); // Conflict with Router's Link
	// ComponentRegistry.register('Navigator', RX.Navigator); // Needs exploration
	ComponentRegistry.register('Picker', RX.Picker);
	ComponentRegistry.register('ScrollView', RX.ScrollView);
	ComponentRegistry.register('Text', RX.Text);
	ComponentRegistry.register('TextInput', RX.TextInput);
	ComponentRegistry.register('View', RX.View);
	ComponentRegistry.register('WebView', RX.WebView);

	/* Register Router Components */
	ComponentRegistry.register('Link', Link);

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

	// Broadcast Event
	CallbackRegistry.run('bluerain.preboot.end.sync');
};
