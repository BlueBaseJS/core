'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (options) {
    if (options === void 0) {
        options = {
            apps: [],
            serverMode: false,
            renderApp: true
        };
    }
    // Extract app, plugins and configs from options
    var serverMode = options.serverMode,
        renderApp = options.renderApp;
    var apps = options.apps || [];
    var plugins = options.plugins || [];
    var config = options.config || [];
    var platform = options.platform || [];
    (0, _checkHooks2.default)();
    _index2.default.Plugins.registerMany(platform);
    _index2.default.Filters.run('bluerain.system.platform.registered');
    // =[ System Lifecycle Event ]= Boot Start
    _index2.default.Filters.run('bluerain.system.boot.start');
    // Initialize all configs
    _index2.default.Configs.registerMany(_config2.default);
    _index2.default.Configs.registerMany(config);
    // =[ System Lifecycle Event ]= Configurations Loaded
    _index2.default.Filters.run('bluerain.system.configurations.loaded');
    // Get Enviornment Options
    // const debug  = BR.Configs.get('debug');
    // const development = BR.Configs.get('development');
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
        return _react2.default.createElement(_Provider.BlueRainProvider, null, _react2.default.createElement(SystemApp, null));
    };
    if (renderApp !== false) {
        _index2.default.Utils.setMainView(BluerainApp);
    }
    // =[ System Lifecycle Event ]= Boot End
    _index2.default.Filters.run('bluerain.system.boot.end');
    return BluerainApp;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _registerComponents = require('./registerComponents');

var _registerComponents2 = _interopRequireDefault(_registerComponents);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Provider = require('./Provider');

var _checkHooks = require('./checkHooks');

var _checkHooks2 = _interopRequireDefault(_checkHooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }