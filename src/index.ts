import BlueRain from './BlueRain';

// Models
import App from './models/App';
import Plugin from './models/Plugin';
export { App, Plugin };

export { withBlueRain, BlueRainProvider } from './Provider';

// This will have all registries as objects
export default BlueRain;

// Typings
export { ConfigType } from './config';
export { BlueRainType } from './BlueRain';
export { JsonComponentSchema } from './utils/JsonSchemaToReact';
export { ComponentRegistryItem, ComponentRegistryHocItem } from './registries/ComponentRegistry';
// export { FilterRegistryItem } from './registries/FilterRegistry';
export { StatefulComponentProperties } from './components/StatefulComponent';
