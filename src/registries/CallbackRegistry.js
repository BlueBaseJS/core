/* @flow */

import reject from 'lodash.reject';

/**
 * All system callbacks are stored in this registry
 * @property {Object} CallbacksTable Storage table of all callbacks
 */
class CallbackRegistry {

	CallbacksTable: {} = {};

	/**
	 * Add a callback function to a hook
	 * @param {String} hook - The name of the hook
	 * @param {Function} callback - The callback function
	 */
	add(hook: string, callback: Function) {
		if (hook === undefined || hook === null) {
			throw new Error(`hook cannot be ${hook}`);
		}
		if (!callback.name) {
			throw new Error(
				`// Warning! You are adding an unnamed callback to ${hook}.
			Please use the function foo () {} syntax.`
			);
		}

		// if callback array doesn't exist yet, initialize it
		if (typeof this.CallbacksTable[hook] === 'undefined') {
			this.CallbacksTable[hook] = [];
		}

		this.CallbacksTable[hook].push(callback);
	};

	/**
	 * Remove a callback from a hook
	 * @param {string} hookName - The name of the hook
	 * @param {string} callbackName - The name of the function to remove
	 */
	remove(hookName: string, callbackName: string) {
		if (hookName === undefined || hookName === null) {
			throw new Error(`hook cannot be ${hookName}`);
		}

		if (callbackName === undefined || callbackName === null) {
			throw new Error(`callback of ${hookName} cannot be ${callbackName}`);
		}

		if (!this.CallbacksTable.hasOwnProperty(hookName)) {
			throw new Error(`${hookName}  is not added. First add hook to remove it.`);
		}

		const noOfCallbacks = this.CallbacksTable[hookName].length;
		this.CallbacksTable[hookName] = reject(
			this.CallbacksTable[hookName],
			callback => callback.name === callbackName
		);
		if (this.CallbacksTable[hookName].length === noOfCallbacks) {
			throw new Error(
				`${hookName} has no callback named ${callbackName}.
			First add callback in ${hookName} to remove it`
			);
		}
	}

	/**
	 * Successively run all of a hook's callbacks on an item
	 * @param {String} hook - First argument: the name of the hook
	 * @param {Object} item - Second argument: the post, comment, modifier, etc.
	 *  on which to run the callbacks
	 * @param {Any} args - Other arguments will be passed to each successive iteration
	 * @returns {Object} Returns the item after it's been through all the callbacks for this hook
	 */
	run(hook: string, item: {}) {
		// the first argument is the name of the hook or an array of functions
		// const hook = arguments[0];
		// the second argument is the item on which to iterate
		// const item = arguments[1];
		// successive arguments are passed to each iteration
		const sliceNumber = 2;
		const args = Array.prototype.slice.call(arguments).slice(sliceNumber);
		if (hook === undefined || hook === null) {
			throw new Error(`hook cannot be ${hook}`);
		}

		// Disabled this condition by design - (by ART)
		// if (!this.CallbacksTable.hasOwnProperty(hook)) {
		// 	throw new Error(`${hook}  is not added. First add hook to run it.`);
		// }
		const callbacks = Array.isArray(hook) ? hook : this.CallbacksTable[hook];

		if (typeof callbacks !== 'undefined' && !!callbacks.length) {
			// if the hook exists, and contains callbacks to run
			return callbacks.reduce((accumulator, callback) => {
				const newArguments = [accumulator].concat(args);

				try {
					const result = callback.apply({}, newArguments);

					if (typeof result === 'undefined') {
						// if result of current iteration is undefined, don't pass it on
						// console.log(
						//   `// Warning: Sync callback [${callback.name}] in hook
						// [${hook}] didn't return a result!`
						// );
						return accumulator;
					}
					return result;
				} catch (error) {
					// console.log(
					//   `// error at callback [${callback.name}] in hook [${hook}]`
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

	/**
	 * Successively run all of a hook's callbacks on an item
	 * in async mode (only works on server)
	 * @param {String} hook - First argument: the name of the hook
	 * @param {Any} args - Other arguments will be passed to each successive iteration
	 */
	runAsync = function(hook: string, args: any) {
		// the first argument is the name of the hook or an array of functions
		// const hook = arguments[0];
		// successive arguments are passed to each iteration
		// const args = Array.prototype.slice.call(arguments).slice(1);

		// const callbacks = Array.isArray(hook) ? hook : this.CallbacksTable[hook];

		// Todo: Find solution for async rather than by using meteor object
		// if (
		//   Meteor.isServer &&
		//   typeof callbacks !== 'undefined' &&
		//   !!callbacks.length
		// ) {
		//   // use defer to avoid holding up client
		//   Meteor.defer(() => {
		//     // run all post submit server callbacks on post object successively
		//     callbacks.forEach(function(callback) {
		//       callback.apply(this, args);
		//     });
		//   });
		// }
	};
}

const callbackRegistry = new CallbackRegistry();
export default callbackRegistry;
