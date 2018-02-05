
import BR, { App, Plugin } from './index';
import React, { ComponentType } from 'react';
import defaultConfigs, { ConfigType } from './config';
import { BlueRainProvider } from './Provider';
import checkHooks from './checkHooks';
import registerComponents from './registerComponents';

/**
 * Options object that `boot` and `bootOnServer` methods expect.
 *
 * @property {Array<BR.App>} apps		An array of apps to load
 * @property {ConfigType} config		Configuration object
 * @property {boolean} 	renderApp	If set to false, BlueRain will not render the main app,
 *  instead it is up to the developer to render it. The App is returned from the boot function.
 * @property {Array<BR.Plugin>} plugins		An array of plugins to load
 * @property {boolean} 	serverMode	Set this flag to true when rendering during Server Side Rendering
 */
export type BootOptions = {
	apps?: App[];
	config?: ConfigType;
	renderApp?: boolean;
	plugins?: Plugin[];
	serverMode?: boolean;
	platform?: Plugin[];
};

export type BootFunction = (options: BootOptions) => ComponentType<any>;

/**
 * Boots the OS and renders the main UI. Use it on the client side
 */
const boot: BootFunction = (
	options = {
		apps:[],
		serverMode: false,
		renderApp: true
	}
) => {

	// Extract app, plugins and configs from options
	const { serverMode, renderApp } = options;
	const apps = options.apps || [];
	const plugins = options.plugins || [];
	const config = options.config || [];
	const platform = options.platform || [];

	// checkHooks();

	// Register plaform
	if (platform.length === 0 && BR.Platform.data.size === 0) {
		throw new Error(`No platform added to BlueRain. Check docs for more info: https://blueeast.gitbooks.io/bluerain-os/`);
	}

	// =[ System Lifecycle Event ]= Platform Registered
	BR.Platform.registerMany(platform);
	BR.Filters.run('bluerain.system.platform.registered');

	// =[ System Lifecycle Event ]= Platform Initialized
	BR.Platform.initializeAll();
	BR.Filters.run('bluerain.system.platform.initialized');

	// =[ System Lifecycle Event ]= Boot Start
	BR.Filters.run('bluerain.system.boot.start');

	// Initialize all configs
	BR.Configs.registerMany(defaultConfigs);
	BR.Configs.registerMany(config);

	// =[ System Lifecycle Event ]= Configurations Loaded
	BR.Filters.run('bluerain.system.configurations.loaded');

	// =[ System Lifecycle Event ]= Components Registered
	// Only runs on first boot
	if (!BR.booted) {
		registerComponents();
		BR.Filters.run('bluerain.system.components.registered');
	}

	// =[ System Lifecycle Event ]= Plugins Registered
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
	const BluerainApp = () => (
		<BlueRainProvider>
			<SystemApp />
		</BlueRainProvider>
	);

	if (renderApp !== false) {
		BR.Utils.setMainView(BluerainApp);
	}

	// =[ System Lifecycle Event ]= Boot End
	BR.Filters.run('bluerain.system.boot.end');

	BR.booted = true;
	return BluerainApp;
};

export default boot;
