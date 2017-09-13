'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouterDom = require('react-router-dom');

Object.keys(_reactRouterDom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reactRouterDom[key];
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