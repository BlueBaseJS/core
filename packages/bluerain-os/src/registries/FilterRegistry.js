/* @flow */

import reject from 'lodash.reject';

/**
 * All system filters are stored in this registry
 * @property {Object} FiltersTable Storage table of all filters
 */
class FilterRegistry {

	FiltersTable = {};

	/**
	 * Add a filter function to a hook
	 * @param {String} hook - The name of the hook
	 * @param {Function} filter - The filter function
	 */
	add(hook, filter) {
		if (hook === undefined || hook === null) {
			throw new Error(`hook cannot be ${hook}`);
		}
		if (!filter.name) {
			console.warn(
				`// Warning! You are adding an unnamed filter to ${hook}.
			Please use the function foo () {} syntax.`
			);
		}

		// if filter array doesn't exist yet, initialize it
		if (typeof this.FiltersTable[hook] === 'undefined') {
			this.FiltersTable[hook] = [];
		}

		this.FiltersTable[hook].push(filter);
	}

	/**
	 * Remove a filter from a hook
	 * @param {string} hookName - The name of the hook
	 * @param {string} filterName - The name of the function to remove
	 */
	remove(hookName: string, filterName: string) {
		if (hookName === undefined || hookName === null) {
			throw new Error(`hook cannot be ${hookName}`);
		}

		if (filterName === undefined || filterName === null) {
			throw new Error(`filter of ${hookName} cannot be ${filterName}`);
		}

		if (!Object.prototype.hasOwnProperty.call(this.FiltersTable, hookName)) {
			throw new Error(`${hookName}  is not added. First add hook to remove it.`);
		}

		const noOffilters = this.FiltersTable[hookName].length;
		this.FiltersTable[hookName] = reject(
			this.FiltersTable[hookName],
			filter => filter.name === filterName
		);
		if (this.FiltersTable[hookName].length === noOffilters) {
			throw new Error(
				`${hookName} has no filter named ${filterName}.
			First add filter in ${hookName} to remove it`
			);
		}
	}

	/**
	 * Successively run all of a hook's filters on an item
	 * @param {String} hook - First argument: the name of the hook
	 * @param {Object} item - Second argument: the post, comment, modifier, etc.
	 *  on which to run the filters
	 * @param {Any} args - Other arguments will be passed to each successive iteration
	 * @returns {Object} Returns the item after it's been through all the filters for this hook
	 */
	run(hook: string, item: {}) {
		// the first argument is the name of the hook or an array of functions
		// const hook = arguments[0];
		// the second argument is the item on which to iterate
		// const item = arguments[1];
		// successive arguments are passed to each iteration
		const sliceNumber = 2;
		const args = Array.prototype.slice.call(arguments).slice(sliceNumber); // eslint-disable-line prefer-rest-params
		if (hook === undefined || hook === null) {
			throw new Error(`hook cannot be ${hook}`);
		}

		const filters = Array.isArray(hook) ? hook : this.FiltersTable[hook];

		if (typeof filters !== 'undefined' && !!filters.length) {
			// if the hook exists, and contains filters to run
			return filters.reduce((accumulator, filter) => {
				const newArguments = [accumulator].concat(args);

				try {
					const result = filter.apply({}, newArguments);

					if (typeof result === 'undefined') {
						// if result of current iteration is undefined, don't pass it on
						// console.log(
						//   `// Warning: Sync filter [${filter.name}] in hook
						// [${hook}] didn't return a result!`
						// );
						return accumulator;
					}
					return result;
				} catch (error) {
					// console.log(
					//   `// error at filter [${filter.name}] in hook [${hook}]`
					// );
					// console.log(error);
					throw error;
					// if (error.break || error.data && error.data.break) {

					// }
					// pass the unchanged accumulator to the next iteration of the loop
					// return accumulator;
				}
			}, item);
		} // else, just return the item unchanged
		return item;
	}
}

export default FilterRegistry;
