'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginRegistry = exports.ConfigRegistry = exports.ComponentRegistry = exports.CallbackRegistry = exports.AppRegistry = exports.Plugin = exports.App = undefined;

var _boot = require('./boot');

Object.keys(_boot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _boot[key];
    }
  });
});

var _router = require('./router');

Object.keys(_router).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _router[key];
    }
  });
});

var _App2 = require('./models/App');

var _App3 = _interopRequireDefault(_App2);

var _Plugin2 = require('./models/Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

var _AppRegistry2 = require('./registries/AppRegistry');

var _AppRegistry3 = _interopRequireDefault(_AppRegistry2);

var _CallbackRegistry2 = require('./registries/CallbackRegistry');

var _CallbackRegistry3 = _interopRequireDefault(_CallbackRegistry2);

var _ComponentRegistry2 = require('./registries/ComponentRegistry');

var _ComponentRegistry3 = _interopRequireDefault(_ComponentRegistry2);

var _ConfigRegistry2 = require('./registries/ConfigRegistry');

var _ConfigRegistry3 = _interopRequireDefault(_ConfigRegistry2);

var _PluginRegistry2 = require('./registries/PluginRegistry');

var _PluginRegistry3 = _interopRequireDefault(_PluginRegistry2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.App = _App3.default;

// Models

exports.Plugin = _Plugin3.default;

// Registries

exports.AppRegistry = _AppRegistry3.default;
exports.CallbackRegistry = _CallbackRegistry3.default;
exports.ComponentRegistry = _ComponentRegistry3.default;
exports.ConfigRegistry = _ConfigRegistry3.default;
exports.PluginRegistry = _PluginRegistry3.default;

// Router