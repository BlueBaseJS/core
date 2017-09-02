'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _WindowInfoPlugin = require('../plugins/WindowInfoPlugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveLayout = function (_RX$Component) {
	_inherits(ResponsiveLayout, _RX$Component);

	function ResponsiveLayout() {
		_classCallCheck(this, ResponsiveLayout);

		return _possibleConstructorReturn(this, (ResponsiveLayout.__proto__ || Object.getPrototypeOf(ResponsiveLayout)).apply(this, arguments));
	}

	_createClass(ResponsiveLayout, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    window = _props.window,
			    def = _props.default,
			    xs = _props.xs,
			    xm = _props.xm,
			    md = _props.md,
			    lg = _props.lg,
			    xl = _props.xl,
			    props = _objectWithoutProperties(_props, ['window', 'default', 'xs', 'xm', 'md', 'lg', 'xl']);

			var Component = this.props[window.size] ? this.props[window.size] : def;

			return _react2.default.createElement(Component, props);
		}
	}]);

	return ResponsiveLayout;
}(_reactxp2.default.Component);

ResponsiveLayout.propTypes = {
	default: _propTypes2.default.element.isRequired,
	xs: _propTypes2.default.element,
	sm: _propTypes2.default.element,
	md: _propTypes2.default.element,
	lg: _propTypes2.default.element,
	xl: _propTypes2.default.element
};

exports.default = (0, _WindowInfoPlugin.withWindowInfo)(ResponsiveLayout);