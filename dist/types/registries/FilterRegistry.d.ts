import MapRegistry from './MapRegistry';
export declare type FilterItem = {
    name: string;
    filter: Function;
};
/**
 * All system filters are stored in this registry
 * @property {Map<string, List<{name:string, filter:Function}>>} data Storage of all
 * filters and their respective functions
 */
declare class FilterRegistry extends MapRegistry {
    constructor();
    /**
     * Add a filter function to a hook.To be deprecated in 2.0.0
     * @param {String} hook - The name of the hook
     * @param {String | function} name - The name of filter function
     * @param {Function} filter - The filter function
     * @param {number} index - The index where function should be placed in array of functions against the hook
     */
    add(hook: string, name: string | Function, filter: Function, index?: number): void;
    /**
     * Add a filter function to a hook.
     * @param {String} hook - The name of the hook
     * @param {String | function} name - The name of filter function
     * @param {Function} filter - The filter function
     * @param {number} index - The index where function should be placed in array of functions against the hook
     */
    set(hook: string, name: string | Function, filter: Function, index?: number): void;
    /**
     * Remove a filter from a hook
     * @param {string} hookName - The name of the hook
     * @param {string} filterName - The name of the function to remove
     */
    remove(hook: string, name: string): void;
    /**
     * Successively run all of a hook's filters on an item
     * @param {String} hook - First argument: the name of the hook
     * @param {Object} item - Second argument: the post, comment, modifier, etc.
     *  on which to run the filters
     * @param {Any} args - Other arguments will be passed to each successive iteration
     * @returns {Object} Returns the item after it's been through all the filters for this hook
     */
    run(hook: string, item?: any): any;
}
export default FilterRegistry;
