import { Map } from 'immutable';
/**
 * A generic Registry class in the BlueRain OS. Used to store data.
 */
export default class Registry {
    name: string;
    data: Map<string, any>;
    constructor(name: string);
    /**
     * Add an item to the Registry.
     *
     * @param {string} key The key of the item
     * @param {any} item  The item to add
     */
    set(key: string, item: any, ...rest: any[]): void;
    /**
     * Replace an item in the Registry.
     *
     * @param {string} key The key of the item
     * @param {any} item  The item to add
     */
    replace(key: string, item: any): void;
    /**
     * Get an item from the Registry by its key.
     *
     * @param {string} key The key of the item
     * @returns {any}
     */
    get(key: string): any;
    /**
     * Check if an item is registered.
     *
     * @param {string} name The name of the item to check
     * @returns {boolean}
     */
    has(key: string): boolean;
    /**
     * Remove a plugin from the registry
     * @param {string} key The key plugin to remove
     */
    remove(key: string, ...rest: any[]): void;
}
