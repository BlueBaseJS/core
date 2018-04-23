import { BlueRain } from '../index';
import isnil from 'lodash.isnil';

export type hookFn = (...args: any[]) => any;

/**
 * All system hooks are stored in this registry
 */
export default class HookRegistry {
	constructor(private BR: BlueRain) {}

	/**
	 * Add a filter function to a hook. If the listener already exists, it will throw an Error.
	 * @param {string} hook Name of hook (filter/event) to subscribe to
	 * @param {string} name Name of the listener function
	 * @param {Function} filter Listener function
	 */
	add(hook: string, name: string, listener: hookFn) {
		const params = this.checkParams(hook, name, listener);
		this.BR.Filters.add(params.hook, params.name, params.listener);
		this.BR.Events.on(params.hook, params.listener);
	}

	/**
	 * Sets a filter function to a hook. If the listener already exists, it will be replaced.
	 * @param {string} hook Name of hook (filter/event) to subscribe to
	 * @param {string} name Name of the listener function
	 * @param {Function} filter Listener function
	 */
	set(hook: string, name: string, listener: hookFn) {
		const params = this.checkParams(hook, name, listener);
		this.BR.Filters.set(params.hook, params.name, params.listener);
		this.BR.Events.on(params.hook, params.listener);
	}

	/**
	 * Checks the params for the `set` and `add` functions
	 * @param {string} hook Name of hook (filter/event) to subscribe to
	 * @param {string} name Name of the listener function
	 * @param {Function} listener Listener function
	 */
	checkParams(hook: string, name: string, listener: hookFn) {
		if (isnil(hook)) {
			throw new Error(`You are adding an invalid hook: ${hook}.`);
		}

		if (typeof name === 'function') {
			listener = name;
			name = listener.name;
		}

		if (isnil(listener)) {
			throw new Error(`Filter function is required to add or set a hook to ${hook}.`);
		}

		return { hook, name, listener };
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
		if (isnil(hook)) {
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
