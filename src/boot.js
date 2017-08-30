/* @flow */

import React from 'react';
import RX from 'reactxp';

import {
	// Models
	App,
	Plugin,
	// Registries
  BlueRain,
	ComponentRegistry,
	ConfigRegistry,
} from './index';


import registerComponents from './registerComponents';
import postinit from './postinit';
import defaultConfigs, { type ConfigType } from './config';
import defaultPlugins from './plugins/defaultPlugins';

/**
 * Options object that `boot` and `bootOnServer` methods expect.
 */
type BootOptions = {
	apps?: Array<App>,
	config?: ConfigType,
	plugins?: Array<Plugin>,
	debug?: boolean,
	development?: boolean,
	ssrMode?: boolean
}

/**
 * Boots the OS and renders the main UI. Use it on the client side
 */
export const boot = function(options: BootOptions = {}) {

	// Extract app, plugins and configs from options
	const { apps, plugins, config } = options;

	// =[ System Lifecycle Event ]= Boot Start
	BlueRain.filters.run('bluerain.system.boot.start');

	// Initialize all configs
	ConfigRegistry.register(defaultConfigs);
	ConfigRegistry.register(config);

	// =[ System Lifecycle Event ]= Configurations Loaded
	BlueRain.filters.run('bluerain.system.configurations.loaded');

	// Get Enviornment Options
	const debug = ConfigRegistry.get('debug');
	const development = ConfigRegistry.get('development');

	// Init System
	RX.App.initialize(debug, development);

	// =[ System Lifecycle Event ]= Components Registered
	registerComponents();
	BlueRain.filters.run('bluerain.system.components.registered');

	// =[ System Lifecycle Event ]= Plugins Registered
  BlueRain.plugins.registerMany(defaultPlugins);
  BlueRain.plugins.registerMany(plugins);
	BlueRain.filters.run('bluerain.system.plugins.registered');

	// =[ System Lifecycle Event ]= Plugins Initialized
  BlueRain.plugins.initializeAll();
	BlueRain.filters.run('bluerain.system.plugins.initialized');

	// =[ System Lifecycle Event ]= Apps Registered
  BlueRain.apps.registerMany(apps);
	BlueRain.filters.run('bluerain.system.apps.registered');

	// =[ System Lifecycle Event ]= Apps Initialized
  BlueRain.apps.initializeAll();
	BlueRain.filters.run('bluerain.system.apps.initialized');

	// =[ System Lifecycle Event ]= Apps Initialized
	postinit();
  BlueRain.filters.run('bluerain.system.initialized');

	// Set View
	let SystemApp = ComponentRegistry.get('BlueRainApp');
	SystemApp = BlueRain.filters.run('bluerain.system.app', SystemApp);

	RX.UserInterface.setMainView(( <SystemApp /> ));

	// =[ System Lifecycle Event ]= Boot End
	BlueRain.filters.run('bluerain.system.boot.end');
};

/**
 * Boots the OS and renders the main UI. Use it on the server for Server Side Rendering
 */
export const bootOnServer = function(options: BootOptions) {
	boot(options);
};
