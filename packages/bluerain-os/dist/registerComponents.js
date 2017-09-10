'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _router = require('./router');

var _SystemLayout = require('./layouts/SystemLayout');

var _SystemLayout2 = _interopRequireDefault(_SystemLayout);

var _ResponsiveLayout = require('./layouts/ResponsiveLayout');

var _ResponsiveLayout2 = _interopRequireDefault(_ResponsiveLayout);

var _Page = require('./pages/Page');

var _Page2 = _interopRequireDefault(_Page);

var _IndexPage = require('./pages/IndexPage');

var _IndexPage2 = _interopRequireDefault(_IndexPage);

var _NotFoundPage = require('./pages/NotFoundPage');

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	/* Regist ReactXP Components */
	_index2.default.Components.register('ActivityIndicator', _reactxp2.default.ActivityIndicator);
	_index2.default.Components.register('Button', _reactxp2.default.Button);
	_index2.default.Components.register('GestureView', _reactxp2.default.GestureView);
	_index2.default.Components.register('Image', _reactxp2.default.Image);
	// BR.Components.register('Link', RX.Link); // Conflict with Router's Link
	// BR.Components.register('Navigator', RX.Navigator); // Needs exploration
	_index2.default.Components.register('Picker', _reactxp2.default.Picker);
	_index2.default.Components.register('ScrollView', _reactxp2.default.ScrollView);
	_index2.default.Components.register('Text', _reactxp2.default.Text);
	_index2.default.Components.register('TextInput', _reactxp2.default.TextInput);
	_index2.default.Components.register('View', _reactxp2.default.View);
	_index2.default.Components.register('WebView', _reactxp2.default.WebView);

	/* Register Router Components */
	_index2.default.Components.register('Link', _router.Link);
	_index2.default.Components.register('Route', _router.Route);
	_index2.default.Components.register('Switch', _router.Switch);
	_index2.default.Components.register('Redirect', _router.Redirect);

	/* Register Layout Components */
	_index2.default.Components.register('SystemLayout', _SystemLayout2.default);
	_index2.default.Components.register('ResponsiveLayout', _ResponsiveLayout2.default);

	/* Register Pages */
	_index2.default.Components.register('Page', _Page2.default);
	_index2.default.Components.register('IndexPage', _IndexPage2.default);
	_index2.default.Components.register('NotFoundPage', _NotFoundPage2.default);
};