'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.kebabcase');

var _lodash4 = _interopRequireDefault(_lodash3);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * All system plugins are stored in this registry
 * @property {Object} PluginsTable Storage table of all plugins
 */
var PluginRegistry = function () {
	function PluginRegistry() {
		_classCallCheck(this, PluginRegistry);

		this.PluginsTable = {};
	}

	_createClass(PluginRegistry, [{
		key: 'register',


		/**
   * Register a Plugin
   * @param {Plugin} plugin The plugin to register
   */
		value: function register(plugin) {
			if (plugin === undefined || plugin === null) {
				throw new Error('No plugin provided');
			}

			if (!plugin.pluginName) {
				throw new Error('Plugin name not provided.');
			}

			if (!plugin.slug) {
				plugin.slug = plugin.pluginName;
			}

			plugin.slug = (0, _lodash4.default)(plugin.slug);

			this.PluginsTable[plugin.slug] = plugin;
		}

		/**
   * Register many plugins at once
   * @param {Array<Plugin>} plugins The array of plugins to register
   */

	}, {
		key: 'registerMany',
		value: function registerMany(plugins) {
			var me = this;
			plugins = plugins || [];

			if (!Array.isArray(plugins)) {
				throw new Error('plugins parameter must be an Array');
			}

			plugins.forEach(function (plugin) {
				return me.register(plugin);
			});
		}

		/**
   * Remove a plugin from the registry
   * @param {string} slug The slug plugin to remove
   */

	}, {
		key: 'remove',
		value: function remove(slug) {
			if (slug === undefined || slug === null) {
				throw new Error('slug cannot be ' + slug);
			}
			if (!this.PluginsTable[slug]) {
				throw new Error(slug + ' is not registered.');
			}
			delete this.PluginsTable[slug];
		}

		/**
   * Get a plugin
   * @param {string} slug The slug plugin to remove
   * @return {Plugin}
   */

	}, {
		key: 'get',
		value: function get(slug) {
			if (slug === undefined || slug === null) {
				throw new Error('No plugin slug provided');
			}

			return (0, _lodash2.default)(this.PluginsTable, slug);
		}

		/**
   * Initialize all plugins
   */

	}, {
		key: 'initializeAll',
		value: function initializeAll() {
			var me = this;
			Object.keys(me.PluginsTable).forEach(function (key) {

				var plugin = me.PluginsTable[key];
				if (plugin.initialize) {
					var config = _index2.default.Configs.get('plugins.' + plugin.slug);
					plugin.config = config;
					plugin.initialize(config);
				}
			});
		}
	}]);

	return PluginRegistry;
}();

exports.default = PluginRegistry;