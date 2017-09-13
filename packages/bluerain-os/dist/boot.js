'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		serverMode: false,
		renderApp: true
	};


	// Extract app, plugins and configs from options
	var apps = options.apps,
	    plugins = options.plugins,
	    config = options.config,
	    serverMode = options.serverMode,
	    renderApp = options.renderApp;

	// Server mode

	_index.Platform.setServerMode(serverMode);

	// =[ System Lifecycle Event ]= Boot Start
	_index2.default.Filters.run('bluerain.system.boot.start');

	// Initialize all configs
	_index2.default.Configs.register(_config2.default);
	_index2.default.Configs.register(config);

	// =[ System Lifecycle Event ]= Configurations Loaded
	_index2.default.Filters.run('bluerain.system.configurations.loaded');

	// Get Enviornment Options
	var debug = _index2.default.Configs.get('debug');
	var development = _index2.default.Configs.get('development');

	// Init System
	_reactxp2.default.App.initialize(debug, development);

	// =[ System Lifecycle Event ]= Components Registered
	(0, _registerComponents2.default)();
	_index2.default.Filters.run('bluerain.system.components.registered');

	// =[ System Lifecycle Event ]= Plugins Registered
	var defaultPlugins = require('./plugins/defaultPlugins').default;
	_index2.default.Plugins.registerMany(defaultPlugins);
	_index2.default.Plugins.registerMany(plugins);
	_index2.default.Filters.run('bluerain.system.plugins.registered');

	// =[ System Lifecycle Event ]= Plugins Initialized
	_index2.default.Plugins.initializeAll();
	_index2.default.Filters.run('bluerain.system.plugins.initialized');

	// =[ System Lifecycle Event ]= Apps Registered
	_index2.default.Apps.registerMany(apps);
	_index2.default.Filters.run('bluerain.system.apps.registered');

	// =[ System Lifecycle Event ]= Apps Initialized
	_index2.default.Apps.initializeAll();
	_index2.default.Filters.run('bluerain.system.apps.initialized');

	// =[ System Lifecycle Event ]= Apps Initialized
	_index2.default.Filters.run('bluerain.system.initialized');

	// Set View
	var SystemApp = _index2.default.Components.get('BlueRainApp');
	SystemApp = _index2.default.Filters.run('bluerain.system.app', SystemApp);
	var BluerainApp = function BluerainApp() {
		return _react2.default.createElement(
			_Provider.BlueRainProvider,
			null,
			_react2.default.createElement(SystemApp, null)
		);
	};

	if (renderApp !== false) {
		_reactxp2.default.UserInterface.setMainView(_react2.default.createElement(BluerainApp, null));
	}

	// =[ System Lifecycle Event ]= Boot End
	_index2.default.Filters.run('bluerain.system.boot.end');

	return BluerainApp;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _registerComponents = require('./registerComponents');

var _registerComponents2 = _interopRequireDefault(_registerComponents);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Provider = require('./Provider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }