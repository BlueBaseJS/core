import { BlueRain } from '../index';
import { List } from 'immutable';
import { hookFn } from './HooksRegistry';
import MapRegistry from './MapRegistry';
import isnil from 'lodash.isnil';

export type FilterRegistryListItem = {
	name: string;
	listener: hookFn;
};

export type FilterRegistryItem = List<FilterRegistryListItem>;

/**
 * All system filters are stored in this registry
 * @property {Map<string, List<{name:string, listener:Function}>>} data Storage of all
 * filters and their respective functions
 */
class FilterRegistry extends MapRegistry<FilterRegistryItem> {
	BR: BlueRain;

	constructor(ctx: BlueRain) {
		super('FilterRegistry');
		this.BR = ctx;
	}

	/**
	 * Add a filter function to a hook. If the filter already exists, it will throw and Error.
	 * @param {String} hook - The name of the hook
	 * @param {String | function} name - The name of listener function
	 * @param {Function} listener - The listener function
	 * @param {number} index - The index where function should be placed in array of functions against the hook
	 */
	add(hook: string, name: string | hookFn, listener: hookFn, index?: number) {
		const { hook: _hook, name: _name, listener: _listener, item } = this.checkParams(
			hook,
			name,
			listener
		);

		let list = this.data.get(_hook);

		if (!list) {
			list = List();
		}

		// Check if this listener already exists
		const currentIndex = list.findIndex(listItem => !!(listItem && listItem.name === _name));
		if (currentIndex > -1) {
			throw new Error(`Filter ${_name.toString()} already exists in ${_hook} hook.`);
		}

		list = index === undefined ? list.push(item) : list.insert(index, item);

		this.data = this.data.set(_hook, list);
	}

	/**
	 * Add a filter function to a hook. If the filter already exists, it will be replaced.
	 * @param {String} hook - The name of the hook
	 * @param {String | function} name - The name of listener function
	 * @param {Function} listener - The listener function
	 * @param {number} index - The index where function should be placed in array of functions against the hook
	 */
	set(hook: string, name: string | hookFn, listener: hookFn, index?: number) {
		const { hook: _hook, name: _name, listener: _listener, item } = this.checkParams(
			hook,
			name,
			listener
		);

		let list = this.data.get(_hook);

		if (!list) {
			list = List();
		}

		// Check if this listener already exists
		const currentIndex = list.findIndex(listItem => !!(listItem && listItem.name === _name));
		if (currentIndex > -1) {
			this.remove(_hook, _name);
			index = index === undefined ? currentIndex : index;
			list = this.data.get(_hook);
		}

		list = index === undefined ? list.push(item) : list.insert(index, item);

		this.data = this.data.set(_hook, list);
	}

	checkParams(hook: string, name: string | hookFn, listener: hookFn) {
		if (isnil(hook)) {
			throw new Error(`Hook cannot be ${hook}`);
		}

		// If a plugin is using an old system of sending named functions
		if (typeof name === 'function') {
			listener = name;
			name = listener.name;
		}

		if (isnil(name)) {
			throw new Error(`You are adding an unnamed listener to ${hook}.`);
		}

		if (isnil(listener)) {
			throw new Error(`You have to provide a listener function while adding it to ${hook}.`);
		}

		return { hook, name, listener, item: { hook, name, listener } };
	}
	/**
	 * Remove a listener from a hook
	 * @param {string} hook - The name of the hook
	 * @param {string} name - The name of the function to remove
	 */
	remove(hook: string, name: string) {
		if (isnil(hook)) {
			throw new Error(`Hook cannot be ${hook}. Please provide valid hook while removing filter.`);
		}

		if (isnil(name)) {
			throw new Error(
				`Filter name cannot be ${name}. Please provide valid function name while removing filter.`
			);
		}

		if (!this.data.has(hook)) {
			throw new Error(`${hook} filter is not added. First add filter to remove it.`);
		}

		let list: FilterRegistryItem = this.data.get(hook) || List();
		const index = list.findIndex(item => !!(item && item.name === name));

		if (index === -1) {
			throw new Error(
				`${name} filter is not added in ${hook} hook. First add filter to remove it.`
			);
		}

		list = list.delete(index);
		this.data = this.data.set(hook, list);
	}

	/**
	 * Successively run all of a hook's filters on an item
	 * @param {String} hook - First argument: the name of the hook
	 * @param {Object} item - Second argument: the post, comment, modifier, etc.
	 *  on which to run the filters
	 * @param {Any} args - Other arguments will be passed to each successive iteration
	 * @returns {Object} Returns the item after it's been through all the filters for this hook
	 */
	run(...allArgs: any[]) {
		const hook = allArgs[0];
		const item = allArgs[1];

		if (isnil(hook)) {
			throw new Error(`Hook cannot be ${hook}`);
		}
		const sliceNumber = 2;
		const args = Array.prototype.slice.call(arguments).slice(sliceNumber); // eslint-disable-line prefer-rest-params
		args.push(this.BR);
		const filters: FilterRegistryItem = this.data.get(hook) || List();

		if (isnil(filters) || filters.size === 0) {
			return item;
		}

		return filters.reduce((accumulator, filterItem = { name: '', listener: () => 0 }) => {
			const newArguments = accumulator ? [accumulator].concat(args) : args;
			const result = filterItem.listener.apply({}, newArguments);

			if (typeof result === 'undefined') {
				// if result of current iteration is undefined, don't pass it on
				console.warn(
					`Warning: Sync filter [${filterItem.name}] in hook [${hook}] didn't return a result!`
				);
				return accumulator;
			}
			return result;
		}, item);
	}
}

export default FilterRegistry;
