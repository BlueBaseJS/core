'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouterNative = require('react-router-native');

Object.keys(_reactRouterNative).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reactRouterNative[key];
    }
  });
});

var _Plugin = require('./Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Plugin2.default;