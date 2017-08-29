'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _index = require('../index');

exports.default = function () {
  return _index.CallbackRegistry.run('bluerain.redux.provider', _reactRedux.Provider);
};