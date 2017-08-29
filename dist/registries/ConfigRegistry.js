'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.set');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.merge');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * All system configs are stored in this registry
 * @property {Object} ConfigsTable Storage table of all configs
 */
var ConfigRegistry = function () {
	function ConfigRegistry() {
		_classCallCheck(this, ConfigRegistry);

		this.ConfigsTable = {};
	}

	_createClass(ConfigRegistry, [{
		key: 'set',


		/**
   * Set a Config
   */
		value: function set(key, value) {
			if (key === undefined || key === null) {
				throw new Error('No config key provided');
			}

			if (value === undefined || value === null) {
				throw new Error('No config value provided');
			}

			(0, _lodash2.default)(this.ConfigsTable, key, value);
		}

		/**
   * Get a config value
   */

	}, {
		key: 'get',
		value: function get(key) {
			if (key === undefined || key === null) {
				throw new Error('No config key provided');
			}

			return (0, _lodash4.default)(this.ConfigsTable, key);
		}

		/**
   * Register many configs at once
   */

	}, {
		key: 'register',
		value: function register(configs) {
			this.ConfigsTable = (0, _lodash6.default)(this.ConfigsTable, configs);
		}
	}]);

	return ConfigRegistry;
}();

var configRegistry = new ConfigRegistry();
exports.default = configRegistry;