'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withBlueRain = undefined;

var _Provider = require('./Provider');

Object.defineProperty(exports, 'withBlueRain', {
	enumerable: true,
	get: function get() {
		return _Provider.withBlueRain;
	}
});

var _api = require('./api');

Object.keys(_api).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _api[key];
		}
	});
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

var _App = require('./models/App');

var _App2 = _interopRequireDefault(_App);

var _Plugin = require('./models/Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

var _boot = require('./boot');

var _boot2 = _interopRequireDefault(_boot);

var _JsonSchemaToReact = require('./utils/JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This will have all registries as objects
exports.default = {
	// BlueRain
	Apps: new _AppRegistry2.default(),
	Plugins: new _PluginRegistry2.default(),
	Filters: new _FilterRegistry2.default(),
	Events: new _EventRegistry2.default(),
	Components: new _ComponentRegistry2.default(),
	Configs: new _ConfigRegistry2.default(),

	// boot
	boot: _boot2.default,

	// Models
	App: _App2.default,
	Plugin: _Plugin2.default,

	// Miscellaneous
	Utils: {
		parseJsonSchema: _JsonSchemaToReact.parseJsonSchema
	}
};