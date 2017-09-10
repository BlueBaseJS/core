'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withBlueRain = exports.BlueRainProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlueRainProvider = (0, _recompose.withContext)({ bluerain: _propTypes2.default.object }, function (props) {
  return { bluerain: _index2.default };
})(function (props) {
  return _react2.default.Children.only(props.children);
});

var withBlueRain = function withBlueRain(Component) {
  return (0, _recompose.getContext)({ bluerain: _propTypes2.default.object })(Component);
};

exports.BlueRainProvider = BlueRainProvider;
exports.withBlueRain = withBlueRain;