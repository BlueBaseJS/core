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

// Models
export App from './models/App';
export Plugin from './models/Plugin';

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

	// Miscellaneous
	Utils: {
		parseJsonSchema,
	}
};
