// Registries
import AppRegistry from './registries/AppRegistry';
import ComponentRegistry from './registries/ComponentRegistry';
import ConfigRegistry from './registries/ConfigRegistry';
import EventRegistry from './registries/EventRegistry';
import FilterRegistry from './registries/FilterRegistry';
import PluginRegistry from './registries/PluginRegistry';

// Models
import App from './models/App';
import Plugin from './models/Plugin';

// Others
import boot from './boot';
import { parseJsonSchema } from './utils/JsonSchemaToReact';

export { withBlueRain } from './Provider';
export * from './api';

// This will have all registries as objects
export default {
	// BlueRain
	Apps: new AppRegistry(),
	Plugins: new PluginRegistry(),
	Filters: new FilterRegistry(),
	Events: new EventRegistry(),
	Components: new ComponentRegistry(),
	Configs: new ConfigRegistry(),

	// boot
	boot,

	// Models
	App,
	Plugin,

	// Miscellaneous
	Utils: {
		parseJsonSchema,
	}
};
