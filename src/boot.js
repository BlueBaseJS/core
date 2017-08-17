import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import { registerApps } from './AppRegistry';
import { initializeConfig } from './ConfigRegistry';
import { registerPlugins, initializePlugins } from './PluginRegistry';
import Routes from './routes';

export const boot = function(options) {

	// Extract app, plugins and configs from options
	const { apps, plugins, config } = options;

	// Initialize all configs
	initializeConfig(config);

	// Process option variables
	registerApps(apps);
	registerPlugins(plugins);

	// Initialize plugins
	initializePlugins();

	//
	return (
  <BrowserRouter>
    <Routes apps={apps} config={config} />
  </BrowserRouter>
	);

};

export const bootOnServer = function(options) {
	boot(options);
};
