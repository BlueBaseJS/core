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

var Launcher = function Launcher(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    _extends({}, props, { viewBox: '0 0 26 28' }),
    _react2.default.createElement('path', { d: 'M22.5 7c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5zM26 2.5c0 5.187-1.437 8.641-5.141 12.359-0.906 0.891-1.937 1.813-3.047 2.75l-0.313 5.922c-0.016 0.156-0.109 0.313-0.25 0.406l-6 3.5c-0.078 0.047-0.156 0.063-0.25 0.063-0.125 0-0.25-0.047-0.359-0.141l-1-1c-0.125-0.141-0.172-0.328-0.125-0.5l1.328-4.312-4.391-4.391-4.312 1.328c-0.047 0.016-0.094 0.016-0.141 0.016-0.125 0-0.266-0.047-0.359-0.141l-1-1c-0.156-0.172-0.187-0.422-0.078-0.609l3.5-6c0.094-0.141 0.25-0.234 0.406-0.25l5.922-0.313c0.938-1.109 1.859-2.141 2.75-3.047 3.906-3.891 6.891-5.141 12.328-5.141 0.281 0 0.531 0.219 0.531 0.5z' })
  );
};

exports.default = Launcher;