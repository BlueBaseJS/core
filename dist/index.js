'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlueRainProvider = exports.withBlueRain = exports.Plugin = exports.App = undefined;

var _Provider = require('./Provider');

Object.defineProperty(exports, 'withBlueRain', {
  enumerable: true,
  get: function get() {
    return _Provider.withBlueRain;
  }
});
Object.defineProperty(exports, 'BlueRainProvider', {
  enumerable: true,
  get: function get() {
    return _Provider.BlueRainProvider;
  }
});

var _BlueRain = require('./BlueRain');

var _BlueRain2 = _interopRequireDefault(_BlueRain);

var _App = require('./models/App');

var _App2 = _interopRequireDefault(_App);

var _Plugin = require('./models/Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Models
exports.App = _App2.default;
exports.Plugin = _Plugin2.default;

// This will have all registries as objects
exports.default = _BlueRain2.default;