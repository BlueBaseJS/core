// Polyfills
import './polyfills';

// Models
export * from './models/App';
export * from './models/Plugin';
export * from './models/Debugger';

// Provider
export * from './Provider';

// Typings
export { ConfigType } from './config';
export { ComponentRegistryItem, ComponentRegistryHocItem } from './registries/ComponentRegistry';
export { StatefulComponentProperties } from './components/StatefulComponent';
export * from './apis';

// Registrys
export * from './registries';

// BlueRain
export * from './BlueRain';
import { BlueRain } from './BlueRain';

// Backwards Compat
const BR = new BlueRain();
export default BR;
