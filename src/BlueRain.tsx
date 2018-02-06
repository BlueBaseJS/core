// Others
import { App, Plugin } from './index';
import { BlueRainAPI, JsonComponentSchema, createApis } from './apis';
import defaultConfigs, { ConfigType } from './config';
import { BlueRainProvider } from './Provider';
import { registerComponents } from './boot';

// Registries
import AppRegistry from './registries/AppRegistry';
import ComponentRegistry from './registries/ComponentRegistry';
import ConfigRegistry from './registries/ConfigRegistry';
import EventRegistry from './registries/EventRegistry';
import FilterRegistry from './registries/FilterRegistry';
import HooksRegistry from './registries/HooksRegistry';
import PluginRegistry from './registries/PluginRegistry';

import React from 'react';

/**
 * Functions
 */
export type setMainViewFunction = (App: React.ComponentType<any>) => void;

export interface BlueRainType {
	Apps: AppRegistry;
	Components: ComponentRegistry;
	Configs: ConfigRegistry;
	Events: EventRegistry;
	Filters: FilterRegistry;
	Plugins: PluginRegistry;
	Hooks: HooksRegistry;
	Platform: PluginRegistry;

	API: BlueRainAPI;

	Utils: {
		parseJsonSchema: (schema: JsonComponentSchema) => React.ReactElement<any> | null;
		setMainView: setMainViewFunction;
		createStyleSheet: any;
	};

	refs?: { [id: string]: any };

	boot: BootFunction;

	booted: boolean;
}

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

export type BootFunction = (options: BootOptions) => React.ComponentType;

/**
 * This is the main BlueRain context. Works as a backbone of whole system.
 *
 * @namespace
 * @prop {AppRegistry} 				Apps 				Instance object of AppRegistry.
 * @prop {ComponentRegistry} 	Components 	Instance object of ComponentRegistry.
 * @prop {ConfigRegistry} 		Configs 		Instance object of ConfigRegistry.
 * @prop {EventRegistry} 			Events 			Instance object of EventRegistry.
 * @prop {FilterRegistry} 		Filters 		Instance object of FilterRegistry.
 * @prop {PluginRegistry} 		Plugins 		Instance object of PluginRegistry.
 * @prop {Object} 						Utils 			Contains utility methods.
 * @prop {Function} 					Utils.parseJsonSchema 			Converts JSON schema to React Component tree
 * @prop {Object} 						refs 				Contains references of objects created by different apps and plugins
 * @prop {Function} 					boot 				Function to boot the OS.
 */
export class BlueRain implements BlueRainType {

	Apps = new AppRegistry(this);
	Components = new ComponentRegistry(this);
	Configs = new ConfigRegistry(this);
	Events = new EventRegistry();
	Filters = new FilterRegistry(this);
	Hooks = new HooksRegistry(this);
	Plugins = new PluginRegistry(this);
	Platform = new PluginRegistry(this);

	API = createApis(this);

	Utils = {

		parseJsonSchema: (schema: JsonComponentSchema) : React.ReactElement<any> | null => {
			console.warn('BR.Utils.parseJsonSchema method has been deprecated, use BR.API.JsonToReact.parse method instead.');
			return this.API.JsonToReact.parse(schema);
		},

		createStyleSheet: (styles: object, ...other: any[]) => styles,

		setMainView: (MainView: React.ComponentType<any>) => {
			console.log('Trying to set MainView', MainView);
			throw new Error('setMainView is not implemented by the platform.');
		}
	};

	refs = {};

	booted = false;

	// constructor() {
	// 	this.Hooks = new HooksRegistry(this.Filters, this.Events);
	// }

	boot: BootFunction = (
		options = {
			apps: [],
			// serverMode: false,
			renderApp: true
		}
	) => {

		// Extract app, plugins and configs from options
		const { renderApp } = options;
		const apps = options.apps || [];
		const plugins = options.plugins || [];
		const config = options.config || [];
		const platform = options.platform || [];

		// checkHooks();

		// Register plaform
		if (platform.length === 0 && this.Platform.data.size === 0) {
			throw new Error(`No platform added to BlueRain.
				Check docs for more info: https://blueeast.gitbooks.io/bluerain-os/`);
		}

		// =[ System Lifecycle Event ]= Platform Registered
		this.Platform.registerMany(platform);
		this.Filters.run('bluerain.system.platform.registered');

		// =[ System Lifecycle Event ]= Platform Initialized
		this.Platform.initializeAll();
		this.Filters.run('bluerain.system.platform.initialized');

		// =[ System Lifecycle Event ]= Boot Start
		this.Filters.run('bluerain.system.boot.start');

		// Initialize all configs
		this.Configs.registerMany(defaultConfigs);
		this.Configs.registerMany(config);

		// =[ System Lifecycle Event ]= Configurations Loaded
		this.Filters.run('bluerain.system.configurations.loaded');

		// =[ System Lifecycle Event ]= Components Registered
		// Only runs on first boot
		if (!this.booted) {
			registerComponents(this);
			this.Filters.run('bluerain.system.components.registered');
		}

		// =[ System Lifecycle Event ]= Plugins Registered
		this.Plugins.registerMany(plugins);
		this.Filters.run('bluerain.system.plugins.registered');

		// =[ System Lifecycle Event ]= Plugins Initialized
		this.Plugins.initializeAll();
		this.Filters.run('bluerain.system.plugins.initialized');

		// =[ System Lifecycle Event ]= Apps Registered
		this.Apps.registerMany(apps);
		this.Filters.run('bluerain.system.apps.registered');

		// =[ System Lifecycle Event ]= Apps Initialized
		this.Apps.initializeAll();
		this.Filters.run('bluerain.system.apps.initialized');

		// =[ System Lifecycle Event ]= Apps Initialized
		this.Filters.run('bluerain.system.initialized');

		// Set View
		let SystemApp = this.Components.get('SystemApp');
		SystemApp = this.Filters.run('bluerain.system.app', SystemApp);
		const BluerainApp = () => (
			<BlueRainProvider>
				<SystemApp />
			</BlueRainProvider>
		);

		if (renderApp !== false) {
			this.Utils.setMainView(BluerainApp);
		}

		// =[ System Lifecycle Event ]= Boot End
		this.Filters.run('bluerain.system.boot.end');

		this.booted = true;
		return BluerainApp;
	}
}

