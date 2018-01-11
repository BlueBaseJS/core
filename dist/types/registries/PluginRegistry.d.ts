import MapRegistry from './MapRegistry';
import { Plugin } from '../index';
/**
 * All system plugins are stored in this registry
 * @property {Map<string, Plugin>} data Storage Map of all plugins
 */
export default class PluginRegistry extends MapRegistry {
    constructor();
    /**
     * Register a Plugin To be deprecated in 2.0.0
     * @param {Plugin} plugin The plugin to register
     */
    register(plugin: Plugin): void;
    /**
     * Register a Plugin
     * @param {Plugin} plugin The plugin to register
     */
    set(plugin: Plugin | any): void;
    /**
     * Register many plugins at once
     * @param {Array<Plugin>} plugins The array of plugins to register
     */
    registerMany(plugins: Plugin[]): void;
    /**
     * Initialize all the registered plugins
     */
    initializeAll(): void;
}
