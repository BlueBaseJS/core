/* @flow */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRegistry from './registries/AppRegistry';
import ConfigRegistry from './registries/ConfigRegistry';
import PluginRegistry from './registries/PluginRegistry';
import Routes from './routes';

import App from './App/App';
import Plugin from './models/Plugin';

import defaultConfigs from './config';

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
	ConfigRegistry.register(defaultConfigs);
	ConfigRegistry.register(config);

	// Process option variables
	AppRegistry.registerMany(apps);
	PluginRegistry.registerMany(plugins);

	// Initialize plugins
	PluginRegistry.initializeAll();

	//
	return (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
	);

};

/**
 * Boots the OS and renders the main UI. Use it on the server for Server Side Rendering
 */
export const bootOnServer = function(options: BootOptions) {
	boot(options);
};
