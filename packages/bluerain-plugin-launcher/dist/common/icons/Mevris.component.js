'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('material-ui/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mevris = function Mevris(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    _extends({ viewBox: '0 0 24.245 15.677' }, props),
    _react2.default.createElement(
      'g',
      null,
      _react2.default.createElement('polygon', { points: '12.112,10.549 3.41,0 0,0 0,10.756 3.463,10.756 3.463,5.699 11.456,15.677 12.296,15.677 20.417,5.41 20.417,10.756 24.245,10.756 24.245,0 20.772,0 \t' })
    )
  );
};

exports.default = Mevris;