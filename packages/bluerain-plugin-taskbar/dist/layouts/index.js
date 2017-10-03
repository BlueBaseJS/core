'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bluerainOs = require('@blueeast/bluerain-os');

var _mobile = require('./mobile/');

var _mobile2 = _interopRequireDefault(_mobile);

var _desktop = require('./desktop/');

var _desktop2 = _interopRequireDefault(_desktop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
	var BR = _ref.bluerain,
	    Component = _ref.Component;


	var layout = {
		component: 'ResponsiveLayout',
		props: {
			default: (0, _desktop2.default)(BR, Component),
			xs: (0, _mobile2.default)(BR, Component),
			sm: (0, _mobile2.default)(BR, Component)
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

exports.default = (0, _bluerainOs.withBlueRain)(Layout);