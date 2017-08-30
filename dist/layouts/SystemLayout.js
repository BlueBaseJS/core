'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _WindowInfoPlugin = require('../plugins/WindowInfoPlugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyle = _reactxp2.default.Styles.createViewStyle({
	width: '100%',
	height: '100%'
}, false);

var SystemLayout = function (_RX$Component) {
	_inherits(SystemLayout, _RX$Component);

	function SystemLayout(props) {
		_classCallCheck(this, SystemLayout);

		var _this = _possibleConstructorReturn(this, (SystemLayout.__proto__ || Object.getPrototypeOf(SystemLayout)).call(this, props));

		_this.onLayout = _this.onLayout.bind(_this);
		return _this;
	}

	/**
  * Whenever the screen/window size changes, notify redux to
  * update `state.bluerain.window` object.
  */


	_createClass(SystemLayout, [{
		key: 'onLayout',
		value: function onLayout() {
			var newDimentions = _reactxp2.default.UserInterface.measureWindow();
			var oldDimentions = this.props.window;

			if (newDimentions.width !== oldDimentions.width || newDimentions.height !== oldDimentions.height) {
				this.props.setWindowDimentions(newDimentions.width, newDimentions.height);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    style = _props.style;

			return _react2.default.createElement(
				_reactxp2.default.View,
				{ onLayout: this.onLayout, style: [defaultStyle, style] },
				' ',
				children,
				' '
			);
		}
	}]);

	return SystemLayout;
}(_reactxp2.default.Component);

exports.default = (0, _WindowInfoPlugin.withWindowInfo)(SystemLayout);