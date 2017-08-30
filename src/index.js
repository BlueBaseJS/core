export * from './boot';

// Models
export App from './models/App';
export Plugin from './models/Plugin';

// Registries
import AppRegistry from './registries/AppRegistry';
import CallbackRegistry from './registries/FilterRegistry';
export ComponentRegistry from './registries/ComponentRegistry';
export ConfigRegistry from './registries/ConfigRegistry';
import PluginRegistry from './registries/PluginRegistry';

export const BlueRain = {
  apps:AppRegistry,
  plugins: PluginRegistry,
  filters: CallbackRegistry
};
// Router
export * from './router';
