// Models
export * from './models/App';
export * from './models/Plugin';

// Provider
export * from './Provider';

// Typings
export { ConfigType } from './config';
export { JsonComponentSchema } from './utils/JsonSchemaToReact';
export { ComponentRegistryItem, ComponentRegistryHocItem } from './registries/ComponentRegistry';
export { StatefulComponentProperties } from './components/StatefulComponent';
export * from './apis';

// BlueRain
export * from './BlueRain';
import { BlueRain } from './BlueRain';

// Backwards Compat
const BR = new BlueRain();
export default BR;
