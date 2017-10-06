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

// import defaultConfigs from '../defaultConfigs';

var Layout = function Layout(_ref) {
	var BR = _ref.bluerain,
	    Component = _ref.Component,
	    bannerUrl = _ref.bannerUrl;


	var configBannerImage = BR.Configs.get('plugins.launcher.bannerImageUrl');
	// const defaultBannerImage = defaultConfigs.bannerImage;
	// const bannerUrl = configBannerImage || defaultBannerImage;

	var layout = {
		component: 'ResponsiveLayout',
		props: {
			default: (0, _desktop2.default)(BR, Component, configBannerImage),
			xs: (0, _desktop2.default)(BR, Component, configBannerImage),
			sm: (0, _desktop2.default)(BR, Component, configBannerImage)
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

exports.default = (0, _bluerainOs.withBlueRain)(Layout);