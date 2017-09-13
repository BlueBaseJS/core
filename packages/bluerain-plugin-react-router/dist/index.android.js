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

var _reactRouterRedux = require('react-router-redux');

Object.defineProperty(exports, 'SystemRouter', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.ConnectedRouter;
  }
});

var _Plugin = require('./Plugin');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _Plugin.Plugin;
  }
});