'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainOs = require('@blueeast/bluerain-os');

var _Launcher = require('../common/Launcher');

var _Launcher2 = _interopRequireDefault(_Launcher);

var _desktop = require('./desktop/');

var _desktop2 = _interopRequireDefault(_desktop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
	var BR = _ref.bluerain,
	    Component = _ref.Component,
	    bannerUrl = _ref.bannerUrl;


	var wallpaper = BR.Configs.get('plugins.launcher.bannerImageUrl');

	var layout = {
		component: 'View',
		props: {
			style: {
				backgroundImage: 'url(' + wallpaper + ')',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				flexGrow: 1
			}
		},
		children: [{
			component: 'ResponsiveLayout',
			props: {
				default: function _default() {
					return _react2.default.createElement(_Launcher2.default, { rows: 6 });
				}
			}
		}]
	};

	return BR.Utils.parseJsonSchema(layout);
};

exports.default = (0, _bluerainOs.withBlueRain)(Layout);