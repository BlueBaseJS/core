'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppRegistry = require('./registries/AppRegistry');

var _AppRegistry2 = _interopRequireDefault(_AppRegistry);

var _ComponentRegistry = require('./registries/ComponentRegistry');

var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

var _ConfigRegistry = require('./registries/ConfigRegistry');

var _ConfigRegistry2 = _interopRequireDefault(_ConfigRegistry);

var _EventRegistry = require('./registries/EventRegistry');

var _EventRegistry2 = _interopRequireDefault(_EventRegistry);

var _FilterRegistry = require('./registries/FilterRegistry');

var _FilterRegistry2 = _interopRequireDefault(_FilterRegistry);

var _PluginRegistry = require('./registries/PluginRegistry');

var _PluginRegistry2 = _interopRequireDefault(_PluginRegistry);

var _HooksRegistry = require('./registries/HooksRegistry');

var _HooksRegistry2 = _interopRequireDefault(_HooksRegistry);

var _boot = require('./boot');

var _boot2 = _interopRequireDefault(_boot);

var _JsonSchemaToReact = require('./utils/JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is the main BlueRain context. Works as a backbone of whole system.
 *
 * @namespace
 * @prop {AppRegistry} 				Apps 				Instance object of AppRegistry.
 * @prop {ComponentRegistry} 	Components 	Instance object of ComponentRegistry.
 * @prop {ConfigRegistry} 		Configs 		Instance object of ConfigRegistry.
 * @prop {EventRegistry} 			Events 			Instance object of EventRegistry.
 * @prop {FilterRegistry} 		Filters 		Instance object of FilterRegistry.
 * @prop {PluginRegistry} 		Plugins 		Instance object of PluginRegistry.
 * @prop {Object} 						Utils 			Contains utility methods.
 * @prop {Function} 					Utils.parseJsonSchema 			Converts JSON schema to React Component tree
 * @prop {Object} 						refs 				Contains references of objects created by different apps and plugins
 * @prop {Function} 					boot 				Function to boot the OS.
 */

// Others
var filtersObj = new _FilterRegistry2.default(); // Registries

var eventsObj = new _EventRegistry2.default();
var pluginObj = new _PluginRegistry2.default();
var BlueRain = {
    // BlueRain
    Apps: new _AppRegistry2.default(),
    Components: new _ComponentRegistry2.default(),
    Configs: new _ConfigRegistry2.default(),
    Events: eventsObj,
    Filters: filtersObj,
    Hooks: new _HooksRegistry2.default(filtersObj, eventsObj),
    Plugins: pluginObj,
    Platform: pluginObj,
    // Miscellaneous
    Utils: {
        parseJsonSchema: _JsonSchemaToReact.parseJsonSchema,
        createStyleSheet: function createStyleSheet(styles) {
            return styles;
        },
        setMainView: function setMainView() {
            throw new Error('setMainView is not implemented by the platform.');
        }
    },
    // References
    refs: {},
    // boot
    boot: _boot2.default
};
exports.default = BlueRain;