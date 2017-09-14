'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactxp = require('reactxp');

var _reactIntl = require('react-intl');

var _router = require('../../../bluerain-os/src/router');

var _pageStyles = require('./pageStyles');

var _pageStyles2 = _interopRequireDefault(_pageStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactxp.View,
				{ style: _pageStyles2.default },
				_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'hello.about', defaultMessage: 'The About Page' }),
				_react2.default.createElement(
					_reactxp.Button,
					{ style: buttonStyles, onPress: About.onNavigateHome },
					'Click Me!'
				)
			);
		}
	}], [{
		key: 'onNavigateHome',
		value: function onNavigateHome() {
			_router.history.push('/');
		}
	}]);

	return About;
}(_react2.default.Component);

exports.default = About;