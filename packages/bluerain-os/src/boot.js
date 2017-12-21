/* @flow */
import React, {  ComponentType } from 'react';
import BR from './index';
import registerComponents from './registerComponents';
import defaultConfigs, { type ConfigType } from './config';
import { BlueRainProvider } from './Provider';

/**
 * Options object that `boot` and `bootOnServer` methods expect.
 *
 * @property {Array<BR.App>} apps		An array of apps to load
 * @property {ConfigType} config		Configuration object
 * @property {boolean} 	renderApp	If set to false, BlueRain will not render the main app, instead it is up to the developer to render it. The App is returned from the boot function.
 * @property {Array<BR.Plugin>} plugins		An array of plugins to load
 * @property {boolean} 	serverMode	Set this flag to true when rendering during Server Side Rendering
 */
type BootOptions = {
	apps?: Array<BR.App>,
	config?: ConfigType,
	renderApp?: boolean,
	plugins?: Array<BR.Plugin>,
	serverMode?: boolean,
}

/**
 * Boots the OS and renders the main UI. Use it on the client side
 */
export default function(options: BootOptions = {
	serverMode: false,
	renderApp: true,
}) : ComponentType<any> {

	// Extract app, plugins and configs from options
	const { apps, plugins, platform, config,  renderApp } = options;

	BR.Plugins.registerMany(platform);
	BR.Filters.run('bluerain.system.platform.registered');


	// =[ System Lifecycle Event ]= Boot Start
	BR.Filters.run('bluerain.system.boot.start');

	// Initialize all configs
	BR.Configs.register(defaultConfigs);
	BR.Configs.register(config);

	// =[ System Lifecycle Event ]= Configurations Loaded
	BR.Filters.run('bluerain.system.configurations.loaded');

	// Get Enviornment Options
	// const debug  = BR.Configs.get('debug');
	// const development = BR.Configs.get('development');


	// =[ System Lifecycle Event ]= Components Registered
	registerComponents();
	BR.Filters.run('bluerain.system.components.registered');

	// =[ System Lifecycle Event ]= Plugins Registered
	const defaultPlugins = require('./plugins/defaultPlugins').default;

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
	BR.Filters.run('bluerain.system.initialized');

	// Set View
	let SystemApp = BR.Components.get('BlueRainApp');
	SystemApp = BR.Filters.run('bluerain.system.app', SystemApp);
	const BluerainApp = () => (<BlueRainProvider><SystemApp /></BlueRainProvider>);

	if (renderApp !== false) {

		BR.Utils.setMainView(BluerainApp);
	}

	// =[ System Lifecycle Event ]= Boot End
	BR.Filters.run('bluerain.system.boot.end');

	return BluerainApp;
}
