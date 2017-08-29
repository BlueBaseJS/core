export * from './boot';

// Models
export App from './models/App';
export Plugin from './models/Plugin';

// Registries
export AppRegistry from './registries/AppRegistry';
export CallbackRegistry from './registries/FilterRegistry';
export ComponentRegistry from './registries/ComponentRegistry';
export ConfigRegistry from './registries/ConfigRegistry';
export PluginRegistry from './registries/PluginRegistry';

// export const blueRain = {
//   apps:AppRegistry,
//   plugins: PluginRegistry,
//   filters: CallbackRegistry,
//   events: '',
// };
// Router
export * from './router';
