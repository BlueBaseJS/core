'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runCallbacksAsync = exports.runCallbacks = exports.removeCallback = exports.addCallback = exports.Callbacks = undefined;

var _lodash = require('lodash.reject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Callbacks = exports.Callbacks = {};

/*
 * @summary Add a callback function to a hook
 * @param {String} hook - The name of the hook
 * @param {Function} callback - The callback function
 */
/**
 * Based on vulcanjs.org
 */

/**
 * @summary Callback hooks provide an easy way to add extra steps to common operations.
 * @namespace Callbacks
 */
var addCallback = exports.addCallback = function addCallback(hook, callback) {
  if (hook === undefined || hook === null) {
    throw new Error('hook cannot be ' + hook);
  }
  if (!callback.name) {
    throw new Error('// Warning! You are adding an unnamed callback to ' + hook + '.\n\t   Please use the function foo () {} syntax.');
  }

  // if callback array doesn't exist yet, initialize it
  if (typeof Callbacks[hook] === 'undefined') {
    Callbacks[hook] = [];
  }

  Callbacks[hook].push(callback);
};

/*
 * @summary Remove a callback from a hook
 * @param {string} hook - The name of the hook
 * @param {string} functionName - The name of the function to remove
 */
var removeCallback = exports.removeCallback = function removeCallback(hookName, callbackName) {
  if (hookName === undefined || hookName === null) {
    throw new Error('hook cannot be ' + hookName);
  }
  if (callbackName === undefined || callbackName === null) {
    throw new Error('callback of ' + hookName + ' cannot be ' + callbackName);
  }
  if (!Callbacks.hasOwnProperty(hookName)) {
    throw new Error(hookName + '  is not added. First add hook to remove it.');
  }
  var noOfCallbacks = Callbacks[hookName].length;
  Callbacks[hookName] = (0, _lodash2.default)(Callbacks[hookName], function (callback) {
    return callback.name === callbackName;
  });
  if (Callbacks[hookName].length === noOfCallbacks) {
    throw new Error(hookName + ' has no callback named ' + callbackName + '.\n\t   First add callback in ' + hookName + ' to remove it');
  }
};

/*
 * @summary Successively run all of a hook's callbacks on an item
 * @param {String} hook - First argument: the name of the hook
 * @param {Object} item - Second argument: the post, comment, modifier, etc.
 *  on which to run the callbacks
 * @param {Any} args - Other arguments will be passed to each successive iteration
 * @returns {Object} Returns the item after it's been through all the callbacks for this hook
 */
var runCallbacks = exports.runCallbacks = function runCallbacks() {
  // the first argument is the name of the hook or an array of functions
  var hook = arguments[0];
  // the second argument is the item on which to iterate
  var item = arguments[1];
  // successive arguments are passed to each iteration
  var sliceNumber = 2;
  var args = Array.prototype.slice.call(arguments).slice(sliceNumber);
  if (hook === undefined || hook === null) {
    throw new Error('hook cannot be ' + hook);
  }

  // Disabled this condition by design - (by ART)
  // if (!Callbacks.hasOwnProperty(hook)) {
  // 	throw new Error(`${hook}  is not added. First add hook to run it.`);
  // }
  var callbacks = Array.isArray(hook) ? hook : Callbacks[hook];

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
};

/*
 * @summary Successively run all of a hook's callbacks on an item
 * in async mode (only works on server)
 * @param {String} hook - First argument: the name of the hook
 * @param {Any} args - Other arguments will be passed to each successive iteration
 */
var runCallbacksAsync = exports.runCallbacksAsync = function runCallbacksAsync() {
  // the first argument is the name of the hook or an array of functions
  // const hook = arguments[0];
  // successive arguments are passed to each iteration
  // const args = Array.prototype.slice.call(arguments).slice(1);

  // const callbacks = Array.isArray(hook) ? hook : Callbacks[hook];

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