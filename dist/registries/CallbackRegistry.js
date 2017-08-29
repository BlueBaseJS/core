'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.reject');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async.parallel');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * All system callbacks are stored in this registry
 * @property {Object} CallbacksTable Storage table of all callbacks
 */
var CallbackRegistry = function () {
	function CallbackRegistry() {
		_classCallCheck(this, CallbackRegistry);

		this.CallbacksTable = {};

		this.runAsync = function (hook, args) {
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
			if (hook === undefined || hook === null) {
				throw new Error('hook cannot be ' + hook);
			}
			(0, _async2.default)(this.CallbacksTable[hook]);
		};
	}

	_createClass(CallbackRegistry, [{
		key: 'add',


		/**
   * Add a callback function to a hook
   * @param {String} hook - The name of the hook
   * @param {Function} callback - The callback function
   */
		value: function add(hook, callback) {
			if (hook === undefined || hook === null) {
				throw new Error('hook cannot be ' + hook);
			}
			if (!callback.name) {
				throw new Error('// Warning! You are adding an unnamed callback to ' + hook + '.\n\t\t\tPlease use the function foo () {} syntax.');
			}

			// if callback array doesn't exist yet, initialize it
			if (typeof this.CallbacksTable[hook] === 'undefined') {
				this.CallbacksTable[hook] = [];
			}

			this.CallbacksTable[hook].push(callback);
		}

		/**
   * Remove a callback from a hook
   * @param {string} hookName - The name of the hook
   * @param {string} callbackName - The name of the function to remove
   */

	}, {
		key: 'remove',
		value: function remove(hookName, callbackName) {
			if (hookName === undefined || hookName === null) {
				throw new Error('hook cannot be ' + hookName);
			}

			if (callbackName === undefined || callbackName === null) {
				throw new Error('callback of ' + hookName + ' cannot be ' + callbackName);
			}

			if (!Object.prototype.hasOwnProperty.call(this.CallbacksTable, hookName)) {
				throw new Error(hookName + '  is not added. First add hook to remove it.');
			}

			var noOfCallbacks = this.CallbacksTable[hookName].length;
			this.CallbacksTable[hookName] = (0, _lodash2.default)(this.CallbacksTable[hookName], function (callback) {
				return callback.name === callbackName;
			});
			if (this.CallbacksTable[hookName].length === noOfCallbacks) {
				throw new Error(hookName + ' has no callback named ' + callbackName + '.\n\t\t\tFirst add callback in ' + hookName + ' to remove it');
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

	}, {
		key: 'run',
		value: function run(hook, item) {
			// the first argument is the name of the hook or an array of functions
			// const hook = arguments[0];
			// the second argument is the item on which to iterate
			// const item = arguments[1];
			// successive arguments are passed to each iteration
			var sliceNumber = 2;
			var args = Array.prototype.slice.call(arguments).slice(sliceNumber); // eslint-disable-line prefer-rest-params
			if (hook === undefined || hook === null) {
				throw new Error('hook cannot be ' + hook);
			}

			var callbacks = Array.isArray(hook) ? hook : this.CallbacksTable[hook];

			if (typeof callbacks !== 'undefined' && !!callbacks.length) {
				// if the hook exists, and contains callbacks to run
				return callbacks.reduce(function (accumulator, callback) {
					var newArguments = [accumulator].concat(args);

					try {
						var result = callback.apply({}, newArguments);

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

	}]);

	return CallbackRegistry;
}();

var callbackRegistry = new CallbackRegistry();
exports.default = callbackRegistry;