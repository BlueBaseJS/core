'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _lodash = require('lodash.isnil');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A generic Registry class in the BlueRain OS. Used to store data.
 */
var Registry = /** @class */function () {
    function Registry(name) {
        if (!name) {
            throw new Error('Registry name is required');
        }
        this.name = name;
        this.data = (0, _immutable.Map)();
    }
    /**
     * Add an item to the Registry.
     *
     * @param {string} key The key of the item
     * @param {any} item  The item to add
     */
    Registry.prototype.set = function (key, item) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        if ((0, _lodash2.default)(key)) {
            throw new Error("No key provided in the add method of " + this.name + " registry.");
        }
        if ((0, _lodash2.default)(item)) {
            throw new Error("No item provided in the add method of " + this.name + " registry.");
        }
        // if (this.data.has(key)) {
        // 	throw new Error(
        // 		`An item with ${key} key already exists in the ${this.name} registry.` +
        // 			` Try using the "replace" method instead.`
        // 	);
        // }
        this.data = this.data.set(key, item);
    };
    /**
     * Replace an item in the Registry.
     *
     * @param {string} key The key of the item
     * @param {any} item  The item to add
     */
    Registry.prototype.replace = function (key, item) {
        if ((0, _lodash2.default)(key)) {
            throw new Error("No key provided in the add method of " + this.name + " registry.");
        }
        if ((0, _lodash2.default)(item)) {
            throw new Error("No item provided in the add method of " + this.name + " registry.");
        }
        if (!this.has(key)) {
            throw new Error("An item with " + key + " key does not exist in the " + this.name + " registry." + " Try using the \"add\" method instead.");
        }
        this.data = this.data.set(key, item);
    };
    /**
     * Get an item from the Registry by its key.
     *
     * @param {string} key The key of the item
     * @returns {any}
     */
    Registry.prototype.get = function (key) {
        if ((0, _lodash2.default)(key)) {
            throw new Error("No key provided in the get method of " + this.name + " registry.");
        }
        return this.data.get(key);
    };
    /**
     * Check if an item is registered.
     *
     * @param {string} name The name of the item to check
     * @returns {boolean}
     */
    Registry.prototype.has = function (key) {
        if ((0, _lodash2.default)(key)) {
            throw new Error("No key provided in the has method of " + this.name + " registry.");
        }
        return this.data.has(key);
    };
    /**
     * Remove a plugin from the registry
     * @param {string} key The key plugin to remove
     */
    Registry.prototype.remove = function (key) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if ((0, _lodash2.default)(key)) {
            throw new Error("key cannot be " + key + " in the remove method of " + this.name + " registry.");
        }
        if (!this.data.has(key)) {
            throw new Error(key + " is not registered in the " + this.name + " registry.");
        }
        this.data = this.data.delete(key);
    };
    return Registry;
}();
exports.default = Registry;