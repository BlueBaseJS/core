import MapRegistry from './MapRegistry';
import { App } from '../index';
/**
 * All system apps are stored in this registry
 * @property {Map<string, App>} data  Map(immutablejs) of all apps
 */
declare class AppRegistry extends MapRegistry {
    constructor();
    /**
     * Register an App To be deprecated in 2.0.0
     * @param {App} app The BlueRain app to register
     */
    register(app: App): void;
    /**
     * Register an App
     * @param {App} app The BlueRain app to register
     */
    set(app: App | any): void;
    /**
     * Register many apps at once
     * @param {Array<App>} apps The BlueRain apps to register
     */
    registerMany(apps: App[]): void;
    /**
     * Initialize all the registered apps
     */
    initializeAll(): void;
    /**
     * Returns the JSON schema of the main APPs component.
     * This component renders all the routes of apps.To be deprecated in 2.0.0
     *
     * @returns {Object} JSON Schema
     */
    getComponentSchema(): any[];
    /**
     * Returns the JSON schema of the main APPs component.
     * This component renders all the routes of apps.
     *
     * @returns {Object} JSON Schema
     */
    getAllRoutes(): any[];
}
export default AppRegistry;
