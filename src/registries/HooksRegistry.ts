import isNil from 'lodash.isnil';

import FilterRegistry from './FilterRegistry';
import EventRegistry from './EventRegistry';
import BR from '../index';
/**
 * All system hooks are stored in this registry
 *
 */
export default class HookRegistry {
	filters: FilterRegistry;
	events: EventRegistry;

	constructor(filters: FilterRegistry, events: EventRegistry) {
		this.filters = filters || new FilterRegistry();
		this.events = events || new EventRegistry();
	}
	/**
	 * Add a filter function to a hook.
	 * @param {String} hook - The name of the hook
	 * @param {Function} filter - The filter function
	 */
	add(hook: string, name: string, filter: () => void) {
		if (isNil(hook)) {
			throw new Error(`You are adding an invalid hook:${hook}.`);
		}
		if (typeof name === 'function') {
			filter = name;
			name = filter.name;
		}
		if (isNil(filter)) {
			throw new Error(`You have to provide a filter function while adding it to ${hook}.`);
		}
		this.filters.set(hook, name, filter);
		this.events.on(hook, filter);
	}
	/**
	 * Successively run all of a hook's functions on an item
	 * @param {String} hook - First argument: the name of the hook
	 * @param {'async' |'sync' | 'both'} mode - Second argument: mode in which hook will run.
	 * If not given mode will be sync
	 * @param {Any} args - Other arguments will be passed to each successive iteration
	 * @returns {Object} Returns the item after it's been through all the filters for this hook
	 */
	run(hook: string, mode: 'async' | 'sync' | 'both' = 'sync', ...args: any[]) {
		if (isNil(hook)) {
			throw new Error(`Hook cannot be ${hook}. Please provide valid hook while running it.`);
		}
		if (mode && (mode !== 'both' && mode !== 'sync' && mode !== 'async')) {
			throw new Error('Invalid mode is entered. Please enter valid mode while running hooks');
		}
		if (mode === 'both') {
			this.events.emit(hook, ...args, BR);
			return this.filters.run(hook, ...args);
		} else if (mode === 'sync') {
			return this.filters.run(hook, ...args);
		} else if (mode === 'async') {
			this.events.emit(hook, ...args, BR);
		}
	}
}
