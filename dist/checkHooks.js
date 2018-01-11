'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    _index2.default.Hooks.add('bluerain.system.apps.registered', 'checkHooks', function () {
        var systemHooks = ['bluerain.system.boot.start', 'bluerain.system.configurations.loaded', 'bluerain.system.components.registered', 'bluerain.system.plugins.registered', 'bluerain.system.plugins.initialized', 'bluerain.system.apps.registered', 'bluerain.system.apps.initialized', 'bluerain.system.initialized', 'bluerain.system.app', 'bluerain.system.boot.end', 'bluerain.system.routes', 'bluerain.system.app.schema', 'bluerain.system.app.layout'];
        var hooksData = [];
        // const addedHooks = [];
        var runnedHooks = [];
        _index2.default.Plugins.data.forEach(function (plugin) {
            var hooks = plugin.hooks ? Object.keys(plugin.hooks) : [];
            var uses = plugin.uses ? plugin.uses.hooks : [];
            hooksData.push({ name: plugin.name, hooks: hooks, uses: uses });
            runnedHooks.push.apply(runnedHooks, uses);
        });
        _index2.default.Apps.data.forEach(function (app) {
            var hooks = app.hooks ? Object.keys(app.hooks) : [];
            var uses = app.uses ? app.uses.hooks : [];
            hooksData.push({ name: app.name, hooks: hooks, uses: uses });
            runnedHooks.push.apply(runnedHooks, uses);
        });
        runnedHooks.push.apply(runnedHooks, systemHooks);
        hooksData.forEach(function (plugin) {
            plugin.hooks.forEach(function (hook) {
                if (!runnedHooks.includes(hook)) {
                    console.warn(plugin.name + " is adding " + hook + " hook but its not running in the system.");
                }
            });
        });
    });
};

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;