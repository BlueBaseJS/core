'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.bootOnServer = exports.boot = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _AppRegistry = require('./AppRegistry');

var _ConfigRegistry = require('./ConfigRegistry');

var _PluginRegistry = require('./PluginRegistry');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boot = exports.boot = function boot(options) {

	// Extract app, plugins and configs from options
	var apps = options.apps,
	    plugins = options.plugins,
	    config = options.config;

	// Initialize all configs

	(0, _ConfigRegistry.initializeConfig)(config);

	// Process option variables
	(0, _AppRegistry.registerApps)(apps);
	(0, _PluginRegistry.registerPlugins)(plugins);

	// Initialize plugins
	(0, _PluginRegistry.initializePlugins)();

	//
	return _react2.default.createElement(
		_reactRouterDom.BrowserRouter,
		null,
		_react2.default.createElement(_routes2.default, { apps: apps, config: config })
	);
};

var bootOnServer = exports.bootOnServer = function bootOnServer(options) {
	boot(options);
};