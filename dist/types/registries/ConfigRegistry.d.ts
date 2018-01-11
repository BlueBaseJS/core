/**
 * All system configs are stored in this registry
 * @property {Object} ConfigsTable Storage table of all configs
 */
declare class ConfigRegistry {
    ConfigsTable: {};
    /**
     * Set a Config
     */
    set(key: string, value: any): void;
    /**
     * Get a config value
     */
    get(key: string): any;
    /**
     * Register a Config To be deprecated in 2.0.0
     */
    register(configs: {}): void;
    /**
     * Register many configs at once
     */
    registerMany(configs: {}): void;
}
export default ConfigRegistry;
