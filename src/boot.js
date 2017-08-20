/* @flow */

import React from 'react';

import {
	// Models
	App,
	Plugin,

	// Registries
	AppRegistry,
	ConfigRegistry,
	PluginRegistry,

	// Router
	SystemRouter
} from './index';

import Routes from './routes';
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
  <SystemRouter>
    <Routes />
  </SystemRouter>
	);

};

/**
 * Boots the OS and renders the main UI. Use it on the server for Server Side Rendering
 */
export const bootOnServer = function(options: BootOptions) {
	boot(options);
};
