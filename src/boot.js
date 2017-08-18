/* @flow */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { registerApps } from './AppRegistry';
import { initializeConfig } from './ConfigRegistry';
import { registerPlugins, initializePlugins } from './PluginRegistry';
import Routes from './routes';

import App from './models/App';
import Plugin from './models/Plugin';

/**
 * Options object that `boot` and `bootOnServer` methods expect.
 */
type BootOptions = {
	apps: Array<App>,
	config: Object,
	plugins: Array<Plugin>
}

/**
 * Boots the OS and renders the main UI. Use it on the client side
 */
export const boot = function(options: BootOptions) {

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

/**
 * Boots the OS and renders the main UI. Use it on the server for Server Side Rendering
 */
export const bootOnServer = function(options: BootOptions) {
	boot(options);
};
