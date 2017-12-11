import isNil from 'lodash.isnil';

import FilterRegistry from './FilterRegistry';
import EventRegistry from './EventRegistry';

/**
 * All system hooks are stored in this registry
 *
 */
export default class HookRegistry {
	filters:FilterRegistry;
	events:EventRegistry;

	constructor() {
		this.filters = new FilterRegistry();
		this.events = new EventRegistry();
	}
    /**
	 * Add a filter function to a hook.
	 * @param {String} hook - The name of the hook
	 * @param {Function} filter - The filter function
	 */
	add(hook:string, filter: Function) {
		if (isNil(hook)) {
			throw new Error(`You are adding an invalid hook:${hook}.`);
		}

		if (isNil(filter)) {
			throw new Error(`You have to provide a filter function while adding it to ${hook}.`);
		}
		this.filters.set(hook, filter);
		this.events.on(hook, filter);
	}
    /**
	 * Successively run all of a hook's functions on an item
	 * @param {String} hook - First argument: the name of the hook
	 * @param {'async' |'sync' | 'both'} mode - Second argument: mode in which hook will run. If not given mode will be sync
	 * @param {Any} args - Other arguments will be passed to each successive iteration
	 * @returns {Object} Returns the item after it's been through all the filters for this hook
	 */
	run(hook:string, mode: 'async' |'sync' | 'both'= 'sync', ...args) {
		if (isNil(hook)) {
			throw new Error(`Hook cannot be ${hook}. Please provide valid hook while running it.`);
		}
		if (mode === 'both') {
			this.events.emit(hook, ...args);
			return this.filters.run(hook, ...args);
		} else if (mode === 'sync') {
			return this.filters.run(hook, ...args);
		} else if (mode === 'async') {
			this.events.emit(hook, ...args);
		}
	}
}
