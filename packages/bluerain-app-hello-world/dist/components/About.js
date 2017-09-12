'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainOs = require('@blueeast/bluerain-os');

var _reactxp = require('reactxp');

var _pageStyles = require('./pageStyles');

var _pageStyles2 = _interopRequireDefault(_pageStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import  { history } from '../../../../../../src/router';


var buttonStyles = _reactxp.Styles.createViewStyle({
	padding: 5,
	backgroundColor: '#007bff',
	color: 'white',
	marginTop: 10,
	borderRadius: 3
});

var About = function (_React$Component) {
	_inherits(About, _React$Component);

	function About() {
		_classCallCheck(this, About);

		return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
	}

	_createClass(About, [{
		key: 'onNavigateHome',
		value: function onNavigateHome() {
			// history.push('/');
		}
	}, {
		key: 'render',
		value: function render() {
			var BR = this.props.bluerain;


			var View = BR.Components.get('View');
			var Button = BR.Components.get('Button');
			var FormattedMessage = BR.Components.get('FormattedMessage');

			return _react2.default.createElement(
				View,
				{ style: _pageStyles2.default },
				_react2.default.createElement(FormattedMessage, {
					id: 'hello.about',
					defaultMessage: 'The About Page'
				}),
				_react2.default.createElement(
					Button,
					{ style: buttonStyles, onPress: this.onNavigateHome },
					'Click Me!'
				)
			);
		}
	}]);

	return About;
}(_react2.default.Component);

exports.default = (0, _bluerainOs.withBlueRain)(About);