export * from './boot';
import RX from 'reactxp';
// Models
export App from './models/App';
export Plugin from './models/Plugin';

// Registries
import AppRegistry from './registries/AppRegistry';
import CallbackRegistry from './registries/FilterRegistry';
export ComponentRegistry from './registries/ComponentRegistry';
export ConfigRegistry from './registries/ConfigRegistry';
import PluginRegistry from './registries/PluginRegistry';
import EventRegistry from './registries/Events';

//This will have all registries as objects
export const BlueRain = {
  apps:AppRegistry,
  plugins: PluginRegistry,
  filters: CallbackRegistry,
  events: EventRegistry
};

//This will have ReactXPApi as objects
// export const ReactXP = {
//   location: RX.Location,
//   network: RX.Network,
//   platform: RX.Platform,
//   app: RX.App
// };

// Router
export * from './router';
