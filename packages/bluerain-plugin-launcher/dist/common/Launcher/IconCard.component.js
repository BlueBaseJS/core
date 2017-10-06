'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _reactLoadingSkeleton = require('react-loading-skeleton');

var _reactLoadingSkeleton2 = _interopRequireDefault(_reactLoadingSkeleton);

var _reactRouterDom = require('react-router-dom');

var _Bulb = require('../icons/Bulb.component');

var _Bulb2 = _interopRequireDefault(_Bulb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
	height: 100,
	width: 100,
	margin: 20,
	textAlign: 'center',
	display: 'inline-block'
};

var IconCard = function (_React$Component) {
	_inherits(IconCard, _React$Component);

	function IconCard() {
		_classCallCheck(this, IconCard);

		return _possibleConstructorReturn(this, (IconCard.__proto__ || Object.getPrototypeOf(IconCard)).apply(this, arguments));
	}

	_createClass(IconCard, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    iconProp = _props.icon,
			    size = _props.size,
			    color = _props.color,
			    backgroundColors = _props.backgroundColors,
			    gradient = _props.gradient,
			    src = _props.src,
			    png = _props.png,
			    shadow = _props.shadow,
			    textColor = _props.textColor,
			    appName = _props.appName,
			    onClick = _props.onClick,
			    link = _props.link;


			var backgroundHexColor = void 0;
			var iconGradient = 'linear-gradient(to right,';

			var iconParent = {
				display: 'flex',
				width: size,
				height: size,
				color: '#' + (0, _tinycolor2.default)(textColor).toHex(),
				borderRadius: '10px',
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: '7px'
			};
			//
			var iconStyle = {
				width: parseInt(size.slice(0, -2), 10) / 1.05 + 'px',
				height: parseInt(size.slice(0, -2), 10) / 1.05 + 'px',
				padding: '22px 0px',
				fill: color,
				// display: "inline-block",
				textAlign: 'center'
			};

			var elevation = 0;
			if (shadow) {
				elevation = 2;
			}
			if (!appName) {
				var timelineTitleEmptyStyle = {
					width: '120px',
					height: '16px',
					marginBottom: '10px'
				};

				var timelineContentEmptyStyle = {
					width: '120px',
					height: '120px',
					backgroundColor: 'rgb(238, 238, 238)',
					borderRadius: '10px',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: '7px'
				};

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('div', { style: timelineContentEmptyStyle }),
					_react2.default.createElement(
						'div',
						{ style: timelineTitleEmptyStyle },
						_react2.default.createElement(_reactLoadingSkeleton2.default, null)
					)
				);
			}
			if (png) {
				iconStyle.background = '' + ('url(' + png + ')');
				iconStyle.backgroundSize = size;
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_Paper2.default, { style: style, zDepth: 1 }),
					_react2.default.createElement(
						'span',
						null,
						appName
					)
				);
			}
			if (src) {
				iconParent.background = '' + ('url(' + src + ')');
			} else {
				if (gradient) {
					backgroundColors.forEach(function (color) {
						iconGradient += color;
						iconGradient += ',';
					});
					iconGradient = iconGradient.substring(0, iconGradient.length - 1);
					iconGradient += ')';
				} else {
					backgroundHexColor = '' + ('#' + (0, _tinycolor2.default)(backgroundColors[0]).toHex());
				}
				iconParent.background = gradient ? iconGradient : backgroundHexColor;
			}

			var icon = _react2.default.cloneElement(iconProp, { style: iconStyle });

			return onClick ? _react2.default.createElement(
				_reactRouterDom.Link,
				{ to: link, onClick: onClick, style: { textDecoration: 'none' } },
				_react2.default.createElement(
					'div',
					{ style: { width: size, textAlign: 'center', color: textColor, fontSize: parseInt(size.slice(0, -2), 10) / 8 + 'px' } },
					_react2.default.createElement(
						_Paper2.default,
						{ style: iconParent, zDepth: elevation },
						icon
					),
					_react2.default.createElement(
						'span',
						null,
						appName
					)
				)
			) : _react2.default.createElement(
				'div',
				{ style: { width: size, textAlign: 'center', color: textColor, fontSize: parseInt(size.slice(0, -2), 10) / 8 + 'px' } },
				_react2.default.createElement(
					_Paper2.default,
					{ style: iconParent, zDepth: elevation },
					icon
				),
				_react2.default.createElement(
					'span',
					null,
					appName
				)
			);
		}
	}]);

	return IconCard;
}(_react2.default.Component);

IconCard.propTypes = {
	icon: _propTypes.PropTypes.element,
	appName: _propTypes.PropTypes.string,
	size: _propTypes.PropTypes.string,
	color: _propTypes.PropTypes.string,
	png: _propTypes.PropTypes.string,
	backgroundColors: _propTypes.PropTypes.arrayOf,
	gradient: _propTypes.PropTypes.bool,
	src: _propTypes.PropTypes.string,
	shadow: _propTypes.PropTypes.bool,
	textColor: _propTypes.PropTypes.string,
	onClick: _propTypes.PropTypes.func,
	link: _propTypes.PropTypes.string
};
IconCard.defaultProps = {
	appName: '',
	icon: _react2.default.createElement(_Bulb2.default, null),
	size: '120px',
	color: 'white',
	png: '',
	backgroundColors: ['rgb(242, 0, 0)', 'yellow'],
	gradient: false,
	src: null,
	shadow: true,
	textColor: 'white',
	onClick: function onClick() {
		console.log('AppIcon from inside of component clicked!');
	},
	link: '#'

};
exports.default = IconCard;