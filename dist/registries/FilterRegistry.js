'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash.isnil');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

var _MapRegistry = require('./MapRegistry');

var _MapRegistry2 = _interopRequireDefault(_MapRegistry);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

/**
 * All system filters are stored in this registry
 * @property {Map<string, List<{name:string, filter:Function}>>} data Storage of all
 * filters and their respective functions
 */
var FilterRegistry = /** @class */function (_super) {
    __extends(FilterRegistry, _super);
    // data: Map<string, List<FilterItem>>;
    function FilterRegistry() {
        return _super.call(this, 'FilterRegistry') || this;
    }
    /**
     * Add a filter function to a hook.To be deprecated in 2.0.0
     * @param {String} hook - The name of the hook
     * @param {String | function} name - The name of filter function
     * @param {Function} filter - The filter function
     * @param {number} index - The index where function should be placed in array of functions against the hook
     */
    FilterRegistry.prototype.add = function (hook, name, filter, index) {
        console.warn('Deprecation Warning: "add" method of FilterRegistry has been deprecated. Please use "set" method instead.');
        this.set(hook, name, filter, index);
    };
    /**
     * Add a filter function to a hook.
     * @param {String} hook - The name of the hook
     * @param {String | function} name - The name of filter function
     * @param {Function} filter - The filter function
     * @param {number} index - The index where function should be placed in array of functions against the hook
     */
    FilterRegistry.prototype.set = function (hook, name, filter, index) {
        if ((0, _lodash2.default)(hook)) {
            throw new Error("Hook cannot be " + hook);
        }
        // If a plugin is using an old system of sending named functions
        if (typeof name === 'function') {
            filter = name;
            name = filter.name;
        }
        if ((0, _lodash2.default)(name)) {
            throw new Error("You are adding an unnamed filter to " + hook + ".");
        }
        if ((0, _lodash2.default)(filter)) {
            throw new Error("You have to provide a filter function while adding it to " + hook + ".");
        }
        var list = this.data.get(hook);
        if (!list) {
            list = (0, _immutable.List)();
        }
        // Check if this filter already exists
        if (list.findIndex(function (listItem) {
            return listItem.name === name;
        }) > -1) {
            throw new Error("Filter " + name.toString() + " already exists in " + hook + " hook.");
        }
        var item = { name: name, filter: filter };
        list = (0, _lodash2.default)(index) ? list.push(item) : list.insert(index, item);
        this.data = this.data.set(hook, list);
    };
    /**
     * Remove a filter from a hook
     * @param {string} hookName - The name of the hook
     * @param {string} filterName - The name of the function to remove
     */
    FilterRegistry.prototype.remove = function (hook, name) {
        if ((0, _lodash2.default)(hook)) {
            throw new Error("Hook cannot be " + hook + ". Please provide valid hook while removing filter.");
        }
        if ((0, _lodash2.default)(name)) {
            throw new Error("Filter name cannot be " + name + ". Please provide valid function name while removing filter.");
        }
        if (!this.data.has(hook)) {
            throw new Error(hook + " filter is not added. First add filter to remove it.");
        }
        var list = this.data.get(hook) || (0, _immutable.List)();
        var index = list.findIndex(function (item) {
            if (item === void 0) {
                item = { name: '', filter: function filter() {
                        return 1;
                    } };
            }
            return item.name === name;
        });
        if (index === -1) {
            throw new Error(name + " filter is not added in " + hook + " hook. First add filter to remove it.");
        }
        list = list.delete(index);
        this.data = this.data.set(hook, list);
    };
    /**
     * Successively run all of a hook's filters on an item
     * @param {String} hook - First argument: the name of the hook
     * @param {Object} item - Second argument: the post, comment, modifier, etc.
     *  on which to run the filters
     * @param {Any} args - Other arguments will be passed to each successive iteration
     * @returns {Object} Returns the item after it's been through all the filters for this hook
     */
    FilterRegistry.prototype.run = function (hook, item) {
        if ((0, _lodash2.default)(hook)) {
            throw new Error("Hook cannot be " + hook);
        }
        var sliceNumber = 2;
        var args = Array.prototype.slice.call(arguments).slice(sliceNumber); // eslint-disable-line prefer-rest-params
        args.push(_index2.default);
        var filters = this.data.get(hook) || (0, _immutable.List)();
        if ((0, _lodash2.default)(filters) || filters.size === 0) {
            return item;
        }
        return filters.reduce(function (accumulator, filterItem) {
            if (filterItem === void 0) {
                filterItem = { name: '', filter: function filter() {
                        return 0;
                    } };
            }
            var newArguments = accumulator ? [accumulator].concat(args) : args;
            var result = filterItem.filter.apply({}, newArguments);
            if (typeof result === 'undefined') {
                // if result of current iteration is undefined, don't pass it on
                console.warn("Warning: Sync filter [" + filterItem.name + "] in hook [" + hook + "] didn't return a result!");
                return accumulator;
            }
            return result;
        }, item);
    };
    return FilterRegistry;
}(_MapRegistry2.default);
exports.default = FilterRegistry;