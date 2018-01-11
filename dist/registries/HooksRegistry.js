'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash.isnil');

var _lodash2 = _interopRequireDefault(_lodash);

var _FilterRegistry = require('./FilterRegistry');

var _FilterRegistry2 = _interopRequireDefault(_FilterRegistry);

var _EventRegistry = require('./EventRegistry');

var _EventRegistry2 = _interopRequireDefault(_EventRegistry);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All system hooks are stored in this registry
 *
 */
var HookRegistry = /** @class */function () {
    function HookRegistry(filters, events) {
        this.filters = filters || new _FilterRegistry2.default();
        this.events = events || new _EventRegistry2.default();
    }
    /**
     * Add a filter function to a hook.
     * @param {String} hook - The name of the hook
     * @param {Function} filter - The filter function
     */
    HookRegistry.prototype.add = function (hook, name, filter) {
        if ((0, _lodash2.default)(hook)) {
            throw new Error("You are adding an invalid hook:" + hook + ".");
        }
        if (typeof name === 'function') {
            filter = name;
            name = filter.name;
        }
        if ((0, _lodash2.default)(filter)) {
            throw new Error("You have to provide a filter function while adding it to " + hook + ".");
        }
        this.filters.set(hook, name, filter);
        this.events.on(hook, filter);
    };
    /**
     * Successively run all of a hook's functions on an item
     * @param {String} hook - First argument: the name of the hook
     * @param {'async' |'sync' | 'both'} mode - Second argument: mode in which hook will run.
     * If not given mode will be sync
     * @param {Any} args - Other arguments will be passed to each successive iteration
     * @returns {Object} Returns the item after it's been through all the filters for this hook
     */
    HookRegistry.prototype.run = function (hook, mode) {
        if (mode === void 0) {
            mode = 'sync';
        }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if ((0, _lodash2.default)(hook)) {
            throw new Error("Hook cannot be " + hook + ". Please provide valid hook while running it.");
        }
        if (mode && mode !== 'both' && mode !== 'sync' && mode !== 'async') {
            throw new Error('Invalid mode is entered. Please enter valid mode while running hooks');
        }
        if (mode === 'both') {
            (_a = this.events).emit.apply(_a, [hook].concat(args, [_index2.default]));
            return (_b = this.filters).run.apply(_b, [hook].concat(args));
        } else if (mode === 'sync') {
            return (_c = this.filters).run.apply(_c, [hook].concat(args));
        } else if (mode === 'async') {
            (_d = this.events).emit.apply(_d, [hook].concat(args, [_index2.default]));
        }
        var _a, _b, _c, _d;
    };
    return HookRegistry;
}();
exports.default = HookRegistry;