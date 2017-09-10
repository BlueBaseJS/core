'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _router = require('./router');

var _Provider = require('./Provider');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

  /* Main System Component */
  _index2.default.Components.register('BlueRainApp', function () {
    return _react2.default.createElement(
      _Provider.BlueRainProvider,
      null,
      _react2.default.createElement(
        _router.SystemRouter,
        null,
        _react2.default.createElement(_routes2.default, null)
      )
    );
  });
};