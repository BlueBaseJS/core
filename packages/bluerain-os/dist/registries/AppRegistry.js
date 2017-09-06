'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.kebabcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultAppRoutePrefix = '/app';

/**
 * All system apps are stored in this registry
 * @property {Object} AppsTable Storage table of all apps
 */

var AppRegistry = function () {
	function AppRegistry() {
		_classCallCheck(this, AppRegistry);

		this.AppsTable = {};
	}

	_createClass(AppRegistry, [{
		key: 'register',


		/**
   * Register an App
   * @param {App} app The BlueRain app to register
   */
		value: function register(app) {
			if (app === undefined || app === null) {
				throw new Error('No app provided');
			}

			if (!app.appName) {
				throw new Error('App name not provided.');
			}

			if (!app.slug) {
				app.slug = app.appName;
			}

			app.slug = (0, _lodash2.default)(app.slug);
			app.appRoutePrefix = _index2.default.Configs.get('appRoutePrefix') || defaultAppRoutePrefix;
			app.path = app.appRoutePrefix + '/' + app.slug;

			this.AppsTable[app.slug] = app;
		}

		/**
   * Register many apps at once
   * @param {Array<App>} apps The BlueRain apps to register
   */

	}, {
		key: 'registerMany',
		value: function registerMany(apps) {
			var me = this;
			apps = apps || [];

			if (!Array.isArray(apps)) {
				throw new Error('apps parameter must be an Array');
			}

			apps.forEach(function (app) {
				return me.register(app);
			});
		}

		/**
   * Initialize all apps
   */

	}, {
		key: 'initializeAll',
		value: function initializeAll() {
			var me = this;
			Object.keys(me.AppsTable).forEach(function (key) {

				var app = me.AppsTable[key];
				if (app.initialize) {
					var config = _index2.default.Configs.get('apps.' + app.slug);
					app.config = config;
					app.initialize(config, _index2.default);
				}
			});
		}

		/**
   * Remove an app from the registry
   * @param {string} slug The slug of the app to remove
   */

	}, {
		key: 'remove',
		value: function remove(slug) {
			if (slug === undefined || slug === null) {
				throw new Error('slug cannot be ' + slug);
			}
			if (!this.AppsTable[slug]) {
				throw new Error(slug + ' is not registered.');
			}
			delete this.AppsTable[slug];
		}

		/**
   * Get all apps
   * @returns {Object} An object with slug: app key value pair
   */

	}, {
		key: 'getApps',
		value: function getApps() {
			return this.AppsTable;
		}

		/**
   * Returns the JSON schema of the main APPs component.
   * This component renders all the apps.
   *
   * @returns {Object} JSON Schema
   */

	}, {
		key: 'getComponentSchema',
		value: function getComponentSchema() {
			var apps = this.getApps();

			var appRoutes = [];
			for (var key in apps) {

				// skip loop if the property is from prototype
				if (!Object.prototype.hasOwnProperty.call(apps, key)) continue;

				var app = apps[key];

				appRoutes.push({
					component: 'Route',
					props: {
						path: app.path,
						key: key,
						component: app
					}
				});
			}

			return appRoutes;
		}
	}]);

	return AppRegistry;
}();

exports.default = AppRegistry;