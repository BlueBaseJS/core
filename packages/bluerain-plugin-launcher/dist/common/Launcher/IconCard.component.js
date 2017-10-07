'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _bluerainOs = require('@blueeast/bluerain-os');

var _Card = require('material-ui/Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppLink = function AppLink(props) {
	var BR = props.bluerain,
	    name = props.name,
	    Icon = props.icon,
	    link = props.link,
	    size = props.size,
	    color = props.color,
	    borderRadius = props.borderRadius;

	var View = BR.Components.get('View');
	var Link = BR.Components.get('Link');

	var style = _reactxp2.default.Styles.createViewStyle({
		width: size,
		color: '#fff',
		textAlign: 'center',
		alignSelf: 'center'
	}, false);

	var appIconStyle = {
		borderRadius: borderRadius,
		backgroundColor: color,
		width: size,
		height: size,
		padding: 16
	};

	var iconStyle = _reactxp2.default.Styles.createViewStyle({
		width: '100%',
		height: '100%',
		fill: '#FFF'
	}, false);

	var appNameStyle = _reactxp2.default.Styles.createViewStyle({
		paddingTop: 5,
		paddingBottom: 5
	}, false);

	return _react2.default.createElement(
		View,
		{ style: style },
		_react2.default.createElement(
			Link,
			{ to: link },
			_react2.default.createElement(
				_Card2.default,
				{ zDepth: 2, style: appIconStyle },
				_react2.default.createElement(
					View,
					null,
					_react2.default.createElement(Icon, { style: iconStyle })
				)
			)
		),
		_react2.default.createElement(
			View,
			{ style: appNameStyle },
			name
		)
	);
};

AppLink.defaultProps = {
	size: '120px',
	color: 'brown',
	borderRadius: 10
};

exports.default = (0, _bluerainOs.withBlueRain)(AppLink);