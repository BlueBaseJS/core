import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { routes } from './routes';

const boot = function(options) {

	const { apps, plugins, config } = options;

	// Add the client app start up code to a function as window.webappStart.
	// The webapp's full HTML will check and call it once the js-content
	// DOM is created.
	const finalRoutes = routes(apps);
	return (
  <BrowserRouter  >
    <Route component={finalRoutes} />
  </BrowserRouter>
	);

};

export default boot;
