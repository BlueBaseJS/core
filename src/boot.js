/* @flow */

import React from 'react';
import RX from 'reactxp';
import BR from './index';


import registerComponents from './registerComponents';
import postinit from './postinit';
import defaultConfigs, { type ConfigType } from './config';
import defaultPlugins from './plugins/defaultPlugins';

/**
 * Options object that `boot` and `bootOnServer` methods expect.
 */
type BootOptions = {
	apps?: Array<BR.App>,
	config?: ConfigType,
	plugins?: Array<BR.Plugin>,
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
	BR.Filters.run('bluerain.system.boot.start');

	// Initialize all configs
	BR.Configs.register(defaultConfigs);
	BR.Configs.register(config);

	// =[ System Lifecycle Event ]= Configurations Loaded
	BR.Filters.run('bluerain.system.configurations.loaded');

	// Get Enviornment Options
	const debug = BR.Configs.get('debug');
	const development = BR.Configs.get('development');

	// Init System
	RX.App.initialize(debug, development);

	// =[ System Lifecycle Event ]= Components Registered
	registerComponents();
	BR.Filters.run('bluerain.system.components.registered');

	// =[ System Lifecycle Event ]= Plugins Registered
	BR.Plugins.registerMany(defaultPlugins);
	BR.Plugins.registerMany(plugins);
	BR.Filters.run('bluerain.system.plugins.registered');

	// =[ System Lifecycle Event ]= Plugins Initialized
	BR.Plugins.initializeAll();
	BR.Filters.run('bluerain.system.plugins.initialized');

	// =[ System Lifecycle Event ]= Apps Registered
	BR.Apps.registerMany(apps);
	BR.Filters.run('bluerain.system.apps.registered');

	// =[ System Lifecycle Event ]= Apps Initialized
	BR.Apps.initializeAll();
	BR.Filters.run('bluerain.system.apps.initialized');

	// =[ System Lifecycle Event ]= Apps Initialized
	postinit();
	BR.Filters.run('bluerain.system.initialized');

	// Set View
	let SystemApp = BR.Components.get('BlueRainApp');
	SystemApp = BR.Filters.run('bluerain.system.app', SystemApp);

	RX.UserInterface.setMainView(( <SystemApp /> ));

	// =[ System Lifecycle Event ]= Boot End
	BR.Filters.run('bluerain.system.boot.end');
};

/**
 * Boots the OS and renders the main UI. Use it on the server for Server Side Rendering
 */
export const bootOnServer = function(options: BootOptions) {
	boot(options);
};
