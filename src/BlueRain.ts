import React from 'react';

// Registries
import AppRegistry from './registries/AppRegistry';
import ComponentRegistry from './registries/ComponentRegistry';
import ConfigRegistry from './registries/ConfigRegistry';
import EventRegistry from './registries/EventRegistry';
import FilterRegistry from './registries/FilterRegistry';
import PluginRegistry from './registries/PluginRegistry';
import HooksRegistry from './registries/HooksRegistry';

// Others
import API, { BlueRainAPI } from './apis';
import boot from './boot';
import { parseJsonSchema, parseJsonSchemaFunction } from './utils/JsonSchemaToReact';

/**
 * Functions
 */
export type setMainViewFunction = (App: React.ComponentType<any>) => void;

export type BlueRainType = {
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
		parseJsonSchema: parseJsonSchemaFunction;
		setMainView: setMainViewFunction;
		createStyleSheet: any;
	};

	refs: { [id: string]: any };

	boot: Function;
};

const filtersObj = new FilterRegistry();
const eventsObj = new EventRegistry();

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
const BlueRain: BlueRainType = {
	// BlueRain
	Apps: new AppRegistry(),
	Components: new ComponentRegistry(),
	Configs: new ConfigRegistry(),
	Events: eventsObj,
	Filters: filtersObj,
	Hooks: new HooksRegistry(filtersObj, eventsObj),
	Plugins: new PluginRegistry(),
	Platform: new PluginRegistry(),

	API,

	// Miscellaneous
	Utils: {
		parseJsonSchema,
		createStyleSheet: styles => styles,
		setMainView: () => {
			throw new Error('setMainView is not implemented by the platform.');
		}
	},

	// References
	refs: {},

	// boot
	boot
};

export default BlueRain;
