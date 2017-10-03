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

var Switch = function Switch(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    _extends({ viewBox: '0 0 28 28' }, props),
    _react2.default.createElement('path', { d: 'M27.422 7.078c0.766 0.781 0.766 2.047 0 2.828l-6.266 6.25 2.344 2.344-2.5 2.5c-3.422 3.422-8.641 3.906-12.516 1.344l-5.656 5.656h-2.828v-2.828l5.656-5.656c-2.562-3.875-2.078-9.094 1.344-12.516l2.5-2.5 2.344 2.344 6.25-6.266c0.781-0.766 2.047-0.766 2.828 0 0.781 0.781 0.781 2.063 0 2.828l-6.25 6.266 3.656 3.656 6.266-6.25c0.781-0.781 2.047-0.781 2.828 0z' })
  );
};

exports.default = Switch;