import BlueRain from './BlueRain';

// Models
import App from './models/App';
import Plugin from './models/Plugin';
export { App, Plugin };

export { withBlueRain, BlueRainProvider } from './Provider';

// This will have all registries as objects
export default BlueRain;
export { BlueRainType } from './BlueRain';
export { BootConfigType } from './config';

// Load default plugins
import defaultPlugins from './plugins/defaultPlugins';
BlueRain.Plugins.registerMany(defaultPlugins);
