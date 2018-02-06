import { BlueRain } from '../index';
import isNil from 'lodash.isnil';

export type hookFn = (...args: any[]) => any;

/**
 * All system hooks are stored in this registry
 */
export default class HookRegistry {
	BR: BlueRain;

	constructor(ctx: BlueRain) {
		this.BR = ctx;
	}

	/**
	 * Add a filter function to a hook.
	 * @param {String} hook - The name of the hook
	 * @param {Function} filter - The filter function
	 */
	add(hook: string, name: string, filter: hookFn) {
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
		this.BR.Filters.set(hook, name, filter);
		this.BR.Events.on(hook, filter);
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
			this.BR.Events.emit(hook, ...args, this);
			return this.BR.Filters.run(hook, ...args);
		} else if (mode === 'sync') {
			return this.BR.Filters.run(hook, ...args);
		} else if (mode === 'async') {
			this.BR.Events.emit(hook, ...args, this);
		}
	}
}
