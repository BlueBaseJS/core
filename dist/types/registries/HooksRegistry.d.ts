import FilterRegistry from './FilterRegistry';
import EventRegistry from './EventRegistry';
/**
 * All system hooks are stored in this registry
 *
 */
export default class HookRegistry {
    filters: FilterRegistry;
    events: EventRegistry;
    constructor(filters: FilterRegistry, events: EventRegistry);
    /**
     * Add a filter function to a hook.
     * @param {String} hook - The name of the hook
     * @param {Function} filter - The filter function
     */
    add(hook: string, name: string, filter: () => void): void;
    /**
     * Successively run all of a hook's functions on an item
     * @param {String} hook - First argument: the name of the hook
     * @param {'async' |'sync' | 'both'} mode - Second argument: mode in which hook will run.
     * If not given mode will be sync
     * @param {Any} args - Other arguments will be passed to each successive iteration
     * @returns {Object} Returns the item after it's been through all the filters for this hook
     */
    run(hook: string, mode?: 'async' | 'sync' | 'both', ...args: any[]): any;
}
