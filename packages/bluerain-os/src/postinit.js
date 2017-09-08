import React from 'react';

import BR from './index';

import { SystemRouter } from './router';

import Page from './pages/Page';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import Routes from './routes';

export default () => {

	/* Main System Component */
	BR.Components.register('BlueRainApp', () => (
  <SystemRouter>
    <Routes />
  </SystemRouter>
	));

	// Pages
	BR.Components.register('Page', Page);
	BR.Components.register('IndexPage', IndexPage);
	BR.Components.register('NotFoundPage', NotFoundPage);
};
