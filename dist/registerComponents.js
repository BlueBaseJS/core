'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _index = require('./index');

var _router = require('./router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	/* Regist ReactXP Components */
	_index.ComponentRegistry.register('ActivityIndicator', _reactxp2.default.ActivityIndicator);
	_index.ComponentRegistry.register('Button', _reactxp2.default.Button);
	_index.ComponentRegistry.register('GestureView', _reactxp2.default.GestureView);
	_index.ComponentRegistry.register('Image', _reactxp2.default.Image);
	// ComponentRegistry.register('Link', RX.Link); // Conflict with Router's Link
	// ComponentRegistry.register('Navigator', RX.Navigator); // Needs exploration
	_index.ComponentRegistry.register('Picker', _reactxp2.default.Picker);
	_index.ComponentRegistry.register('ScrollView', _reactxp2.default.ScrollView);
	_index.ComponentRegistry.register('Text', _reactxp2.default.Text);
	_index.ComponentRegistry.register('TextInput', _reactxp2.default.TextInput);
	_index.ComponentRegistry.register('View', _reactxp2.default.View);
	_index.ComponentRegistry.register('WebView', _reactxp2.default.WebView);

	/* Register Router Components */
	_index.ComponentRegistry.register('Link', _router.Link);
	_index.ComponentRegistry.register('Route', _router.Route);
	_index.ComponentRegistry.register('Switch', _router.Switch);
};