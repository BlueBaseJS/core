'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainOs = require('@blueeast/bluerain-os');

var _apps = require('material-ui/svg-icons/navigation/apps');

var _apps2 = _interopRequireDefault(_apps);

var _LauncherComponent = require('./LauncherComponent');

var _LauncherComponent2 = _interopRequireDefault(_LauncherComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function Container(props) {
	var BR = props.bluerain;


	var appsList = Object.keys(BR.Apps.AppsTable);
	var appListData = [];

	appsList.forEach(function (appName) {
		var app = BR.Apps.get(appName);

		appListData.push({
			icon: app.appIcon || _apps2.default,
			name: app.appName,
			color: app.iconColor,
			slug: app.slug,
			link: app.path
		});
	});

	return _react2.default.createElement(_LauncherComponent2.default, _extends({ apps: appListData }, props));
};

exports.default = (0, _bluerainOs.withBlueRain)(Container);