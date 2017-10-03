'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withSystemNav;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _connect = require('./connect');

var _InitialState = require('./InitialState');

var _InitialState2 = _interopRequireDefault(_InitialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withSystemNav(Component) {

	var systemNav = _InitialState2.default;

	var WithSystemNavComponent = (0, _reactRedux.connect)(_connect.mapStateToProps, _connect.mapDispatchToProps)(Component);

	return function (props) {
		return _react2.default.createElement(WithSystemNavComponent, _extends({ systemNav: systemNav }, props));
	};
}