/* @flow */

import isFunction from 'lodash.isfunction';
import isNil from 'lodash.isnil';

import { List } from 'immutable';

import MapRegistry from './MapRegistry';

type FilterItem = {
	name: string,
	filter: Function
};

/**
 * All system filters are stored in this registry
 * @property {Map<string, List<{name:string, filter:Function}>>} data Storage of all filters and their respective functions
 */
class FilterRegistry extends MapRegistry {

	data: Map<string, List<FilterItem>>;

	constructor() {
		super('FilterRegistry');
	}
	/**
	 * Add a filter function to a hook.To be deprecated in 2.0.0
	 * @param {String} hook - The name of the hook
	 * @param {String | function} name - The name of filter function
	 * @param {Function} filter - The filter function
	 * @param {number} index - The index where function should be placed in array of functions against the hook
	 */
	add(hook: string, name: string | Function, filter: Function, index: number) {
		console.warn('Deprecation Warning: "add" method of FilterRegistry has been deprecated. Please use "set" method instead.');
		this.set(hook, name, filter, index);
	}
	/**
	 * Add a filter function to a hook.
	 * @param {String} hook - The name of the hook
	 * @param {String | function} name - The name of filter function
	 * @param {Function} filter - The filter function
	 * @param {number} index - The index where function should be placed in array of functions against the hook
	 */
	set(hook: string, name: string | Function, filter: Function, index: number) {
		if (isNil(hook)) {
			throw new Error(`Hook cannot be ${hook}`);
		}

		// If a plugin is using an old system of sending named functions
		if (typeof name === 'function') {
			filter = name;
			name = filter.name;
		}

		if (isNil(name)) {
			throw new Error(`You are adding an unnamed filter to ${hook}.`);
		}

		if (isNil(filter)) {
			throw new Error(`You have to provide a filter function to ${hook}.`);
		}

		let list = this.data.get(hook);

		if (!list) {
			list = List();
		}

		// Check if this filter already exists
		if (list.findIndex(item => item.name === name) > -1) {
			throw new Error(`Filter ${name.toString()} already exists in ${hook} hook.`);
		}

		const item = { name, filter };

		list = (isNil(index)) ? list.push(item) : list.insert(index, item);

		this.data = this.data.set(hook, list);
	}

	/**
	 * Remove a filter from a hook
	 * @param {string} hookName - The name of the hook
	 * @param {string} filterName - The name of the function to remove
	 */
	remove(hook: string, name: string) {
		if (isNil(hook)) {
			throw new Error(`Hook cannot be ${hook}`);
		}

		if (isNil(name)) {
			throw new Error(`Filter name cannot be ${name}`);
		}

		if (!this.data.has(hook)) {
			throw new Error(`${hook} filter is not added. First add filter to remove it.`);
		}

		let list:List<FilterItem> = this.data.get(hook);
		const index = list.findIndex(item => item.name === name);

		if (index === -1) {
			throw new Error(`${name} filter is not added in ${hook} hook. First add filter to remove it.`);
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
	run(hook:string, item:any) {
		if (isNil(hook)) {
			throw new Error(`Hook cannot be ${hook}`);
		}
		const sliceNumber = 2;
		const args = Array.prototype.slice.call(arguments).slice(sliceNumber); // eslint-disable-line prefer-rest-params

		const filters:List<FilterItem> = this.data.get(hook);

		if (isNil(filters) || filters.size === 0) {
			return item;
		}

		return filters.reduce((accumulator, item) => {
			const newArguments = [accumulator].concat(args);
			const result = item.filter.apply({}, newArguments);

			if (typeof result === 'undefined') {
				// if result of current iteration is undefined, don't pass it on
				console.warn(`Warning: Sync filter [${item.name}] in hook [${hook}] didn't return a result!`);
				return accumulator;
			}
			return result;
		}, item);
	}
}

export default FilterRegistry;
