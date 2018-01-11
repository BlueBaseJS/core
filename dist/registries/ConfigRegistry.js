'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash.set');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.merge');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.isnil');

var _lodash8 = _interopRequireDefault(_lodash7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All system configs are stored in this registry
 * @property {Object} ConfigsTable Storage table of all configs
 */
var ConfigRegistry = /** @class */function () {
    function ConfigRegistry() {
        this.ConfigsTable = {};
    }
    /**
     * Set a Config
     */
    ConfigRegistry.prototype.set = function (key, value) {
        if ((0, _lodash8.default)(key)) {
            throw new Error('No config key provided. Please provide valid key while adding config.');
        }
        if ((0, _lodash8.default)(value)) {
            throw new Error('No config value provided. Please provide valid value while adding config.');
        }
        (0, _lodash2.default)(this.ConfigsTable, key, value);
    };
    /**
     * Get a config value
     */
    ConfigRegistry.prototype.get = function (key) {
        if ((0, _lodash8.default)(key)) {
            throw new Error('No config key provided. Please provide valid key while getting config.');
        }
        return (0, _lodash4.default)(this.ConfigsTable, key);
    };
    /**
     * Register a Config To be deprecated in 2.0.0
     */
    ConfigRegistry.prototype.register = function (configs) {
        console.warn('Deprecation Warning: "register" method of ConfigRegistry has been deprecated.', ' Please use "registerMany" method instead.');
        this.registerMany(configs);
    };
    /**
     * Register many configs at once
     */
    ConfigRegistry.prototype.registerMany = function (configs) {
        this.ConfigsTable = (0, _lodash6.default)(this.ConfigsTable, configs);
    };
    return ConfigRegistry;
}();
exports.default = ConfigRegistry;