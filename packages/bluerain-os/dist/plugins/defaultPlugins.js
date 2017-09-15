'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bluerainPluginReactRouter = require('@blueeast/bluerain-plugin-react-router');

var _bluerainPluginReactRouter2 = _interopRequireDefault(_bluerainPluginReactRouter);

var _bluerainPluginRedux = require('@blueeast/bluerain-plugin-redux');

var _bluerainPluginRedux2 = _interopRequireDefault(_bluerainPluginRedux);

var _WindowInfoPlugin = require('./WindowInfoPlugin');

var _WindowInfoPlugin2 = _interopRequireDefault(_WindowInfoPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_bluerainPluginReactRouter2.default, _bluerainPluginRedux2.default, _WindowInfoPlugin2.default]; // This file registers builtin plugins that ship with BlueRain OS