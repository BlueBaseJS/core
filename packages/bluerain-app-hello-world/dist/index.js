'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluerainOs = require('@blueeast/bluerain-os');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnhancedApp = (0, _bluerainOs.withBlueRain)(_App2.default);
EnhancedApp.appName = 'Hello World';

exports.default = EnhancedApp;