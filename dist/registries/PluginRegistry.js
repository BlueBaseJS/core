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

/**
 * All system plugins are stored in this registry
 * @property {Map<string, Plugin>} data Storage Map of all plugins
 */
var PluginRegistry = /** @class */function (_super) {
    __extends(PluginRegistry, _super);
    // data: Map<string, Plugin>;
    function PluginRegistry() {
        return _super.call(this, 'PluginRegistry') || this;
    }
    /**
     * Register a Plugin To be deprecated in 2.0.0
     * @param {Plugin} plugin The plugin to register
     */
    PluginRegistry.prototype.register = function (plugin) {
        console.warn('Deprecation Warning: "register" method of PluginRegistry has been deprecated. Please use "set" method instead.');
        this.set(plugin);
    };
    /**
     * Register a Plugin
     * @param {Plugin} plugin The plugin to register
     */
    // cheated here to remove ts error: set(plugin: Plugin) is not compatible with
    // set(key: string, item: any, ...rest: any[])
    PluginRegistry.prototype.set = function (plugin) {
        if ((0, _lodash4.default)(plugin)) {
            throw new Error('No plugin provided');
        }
        if (!plugin.pluginName) {
            throw new Error('Plugin name not provided.');
        }
        if (!plugin.slug) {
            plugin.slug = plugin.pluginName;
        }
        plugin.slug = (0, _lodash2.default)(plugin.slug);
        _super.prototype.set.call(this, plugin.slug, plugin);
    };
    /**
     * Register many plugins at once
     * @param {Array<Plugin>} plugins The array of plugins to register
     */
    PluginRegistry.prototype.registerMany = function (plugins) {
        var _this = this;
        plugins = plugins || [];
        if (!Array.isArray(plugins)) {
            throw new Error('Plugins parameter must be an Array');
        }
        plugins.forEach(function (plugin) {
            return _this.set(plugin);
        });
    };
    /**
     * Initialize all the registered plugins
     */
    PluginRegistry.prototype.initializeAll = function () {
        this.data.forEach(function (plugin) {
            if (plugin.hooks) {
                Object.keys(plugin.hooks).forEach(function (hook) {
                    _index2.default.Hooks.add(hook, plugin.slug + "." + hook, plugin.hooks[hook]);
                });
            }
            if (plugin.initialize) {
                var config = _index2.default.Configs.get("plugins." + plugin.slug);
                plugin.config = config;
                plugin.initialize(config, _index2.default);
            }
        });
    };
    return PluginRegistry;
}(_MapRegistry2.default);
exports.default = PluginRegistry;