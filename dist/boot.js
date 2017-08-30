'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bootOnServer = exports.boot = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _index = require('./index');

var _registerComponents = require('./registerComponents');

var _registerComponents2 = _interopRequireDefault(_registerComponents);

var _postinit = require('./postinit');

var _postinit2 = _interopRequireDefault(_postinit);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _defaultPlugins = require('./plugins/defaultPlugins');

var _defaultPlugins2 = _interopRequireDefault(_defaultPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Boots the OS and renders the main UI. Use it on the client side
 */


/**
 * Options object that `boot` and `bootOnServer` methods expect.
 */
var boot = exports.boot = function boot() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  // Extract app, plugins and configs from options
  var apps = options.apps,
      plugins = options.plugins,
      config = options.config;

  // =[ System Lifecycle Event ]= Boot Start

  _index.blueRain.filters.run('bluerain.system.boot.start');

  // Initialize all configs
  _index.ConfigRegistry.register(_config2.default);
  _index.ConfigRegistry.register(config);

  // =[ System Lifecycle Event ]= Configurations Loaded
  _index.blueRain.filters.run('bluerain.system.configurations.loaded');

  // Get Enviornment Options
  var debug = _index.ConfigRegistry.get('debug');
  var development = _index.ConfigRegistry.get('development');

  // Init System
  _reactxp2.default.App.initialize(debug, development);

  // =[ System Lifecycle Event ]= Components Registered
  (0, _registerComponents2.default)();
  _index.blueRain.filters.run('bluerain.system.components.registered');

  // =[ System Lifecycle Event ]= Plugins Registered
  _index.blueRain.plugins.registerMany(_defaultPlugins2.default);
  _index.blueRain.plugins.registerMany(plugins);
  _index.blueRain.filters.run('bluerain.system.plugins.registered');

  // =[ System Lifecycle Event ]= Plugins Initialized
  _index.blueRain.plugins.initializeAll();
  _index.blueRain.filters.run('bluerain.system.plugins.initialized');

  // =[ System Lifecycle Event ]= Apps Registered
  _index.blueRain.apps.registerMany(apps);
  _index.blueRain.filters.run('bluerain.system.apps.registered');

  // =[ System Lifecycle Event ]= Apps Initialized
  _index.blueRain.apps.initializeAll();
  _index.blueRain.filters.run('bluerain.system.apps.initialized');

  // =[ System Lifecycle Event ]= Apps Initialized
  (0, _postinit2.default)();
  _index.blueRain.filters.run('bluerain.system.initialized');

  // Set View
  var SystemApp = _index.ComponentRegistry.get('BlueRainApp');
  SystemApp = _index.blueRain.filters.run('bluerain.system.app', SystemApp);

  _reactxp2.default.UserInterface.setMainView(_react2.default.createElement(SystemApp, null));

  // =[ System Lifecycle Event ]= Boot End
  _index.blueRain.filters.run('bluerain.system.boot.end');
};

/**
 * Boots the OS and renders the main UI. Use it on the server for Server Side Rendering
 */


var bootOnServer = exports.bootOnServer = function bootOnServer(options) {
  boot(options);
};