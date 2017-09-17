/* @flow */
// Registries
import AppRegistry from './registries/AppRegistry';
import ComponentRegistry from './registries/ComponentRegistry';
import ConfigRegistry from './registries/ConfigRegistry';
import EventRegistry from './registries/EventRegistry';
import FilterRegistry from './registries/FilterRegistry';
import PluginRegistry from './registries/PluginRegistry';

// Others
import boot from './boot';
import { parseJsonSchema } from './utils/JsonSchemaToReact';

export type BlueRainType = {
	Apps: AppRegistry,
	Components: ComponentRegistry,
	Configs: ConfigRegistry,
	Events: EventRegistry,
	Filters: FilterRegistry,
	Plugins: PluginRegistry,

	Utils: {
		parseJsonSchema: Function
	},

	refs: { [id: string]: {} },

	boot: Function
};

const BlueRain: BlueRainType = {
	// BlueRain
	Apps: new AppRegistry(),
	Components: new ComponentRegistry(),
	Configs: new ConfigRegistry(),
	Events: new EventRegistry(),
	Filters: new FilterRegistry(),
	Plugins: new PluginRegistry(),

	// Miscellaneous
	Utils: {
		parseJsonSchema,
	},

	// References
	refs: {},

	// boot
	boot,
};

export default BlueRain;
