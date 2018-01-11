'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash.kebabcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isnil');

var _lodash4 = _interopRequireDefault(_lodash3);

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

var defaultAppRoutePrefix = '/app';
/**
 * All system apps are stored in this registry
 * @property {Map<string, App>} data  Map(immutablejs) of all apps
 */
var AppRegistry = /** @class */function (_super) {
    __extends(AppRegistry, _super);
    // data: Map<string, App>;
    function AppRegistry() {
        return _super.call(this, 'AppRegistry') || this;
    }
    /**
     * Register an App To be deprecated in 2.0.0
     * @param {App} app The BlueRain app to register
     */
    AppRegistry.prototype.register = function (app) {
        console.warn('Deprecation Warning: "register" method of AppRegistry has been deprecated.' + ' Please use "set" method instead.');
        this.set(app);
    };
    /**
     * Register an App
     * @param {App} app The BlueRain app to register
     */
    // cheated here to remove ts error: set(app: App) is not compatible with
    // set(key: string, item: any, ...rest: any[])
    AppRegistry.prototype.set = function (app) {
        if ((0, _lodash4.default)(app)) {
            throw new Error("App cannot be " + app + ".Please provide valid app while registering an app.");
        }
        if (!app.appName) {
            throw new Error('App name not provided. Please provide "appName" while registering an app');
        }
        if (!app.slug) {
            app.slug = app.appName;
        }
        app.slug = (0, _lodash2.default)(app.slug);
        app.appRoutePrefix = _index2.default.Configs.get('appRoutePrefix') || defaultAppRoutePrefix;
        app.path = app.appRoutePrefix + "/" + app.slug;
        _super.prototype.set.call(this, app.slug, app);
    };
    /**
     * Register many apps at once
     * @param {Array<App>} apps The BlueRain apps to register
     */
    AppRegistry.prototype.registerMany = function (apps) {
        var _this = this;
        apps = apps || [];
        if (!Array.isArray(apps)) {
            throw new Error('Apps parameter while registering via "registerMany" method must be an array');
        }
        apps.forEach(function (app) {
            return _this.set(app);
        });
    };
    /**
     * Initialize all the registered apps
     */
    AppRegistry.prototype.initializeAll = function () {
        this.data.forEach(function (app) {
            if (app.hooks) {
                Object.keys(app.hooks).forEach(function (hook) {
                    _index2.default.Hooks.add(hook, app.slug + "." + hook, app.hooks[hook]);
                });
            }
            if (app.initialize) {
                var config = _index2.default.Configs.get("apps." + app.slug);
                app.config = config;
                app.initialize(config, _index2.default);
            }
        });
    };
    /**
     * Returns the JSON schema of the main APPs component.
     * This component renders all the routes of apps.To be deprecated in 2.0.0
     *
     * @returns {Object} JSON Schema
     */
    AppRegistry.prototype.getComponentSchema = function () {
        console.warn('Deprecation Warning: "getComponentSchema" method of AppRegistry has been deprecated.' + ' Please use "getAllRoutes" method instead.');
        return this.getAllRoutes();
    };
    /**
     * Returns the JSON schema of the main APPs component.
     * This component renders all the routes of apps.
     *
     * @returns {Object} JSON Schema
     */
    AppRegistry.prototype.getAllRoutes = function () {
        var appRoutes = [];
        this.data.forEach(function (app) {
            appRoutes.push({
                component: 'Route',
                props: {
                    path: app.path,
                    key: app.slug,
                    component: app
                }
            });
        });
        return appRoutes;
    };
    return AppRegistry;
}(_MapRegistry2.default);
exports.default = AppRegistry;