import React from 'react';

import BR from './index';

import { SystemRouter } from './router';
import { BlueRainProvider } from './Provider';
import Routes from './routes';

export default () => {

	/* Main System Component */
	BR.Components.register('BlueRainApp', () => (
  <BlueRainProvider>
    <SystemRouter>
      <Routes />
    </SystemRouter>
  </BlueRainProvider>
	));
};
