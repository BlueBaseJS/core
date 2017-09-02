'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _redux = require('./redux');

var _Page = require('./pages/Page');

var _Page2 = _interopRequireDefault(_Page);

var _IndexPage = require('./pages/IndexPage');

var _IndexPage2 = _interopRequireDefault(_IndexPage);

var _Page3 = require('./pages/404Page');

var _Page4 = _interopRequireDefault(_Page3);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

	/* Main System Component */
	_index.ComponentRegistry.register('BlueRainApp', function () {
		return _react2.default.createElement(
			_index.SystemRouter,
			null,
			_react2.default.createElement(_routes2.default, null)
		);
	});

	var store = (0, _redux.createStore)();
	var ReduxProvider = (0, _redux.getProvider)();

	// withRedux HOC Method
	var withRedux = function withRedux(App) {
		return function (props) {
			return _react2.default.createElement(
				ReduxProvider,
				{ store: store },
				_react2.default.createElement(App, props)
			);
		};
	};

	// Add redux to main system app
	_index.blueRain.filters.add('bluerain.system.app', function AddReduxToSystemApp(App) {
		return withRedux(App);
	});

	// Pages
	_index.ComponentRegistry.register('Page', _Page2.default);
	_index.ComponentRegistry.register('IndexPage', _IndexPage2.default);
	_index.ComponentRegistry.register('404Page', _Page4.default);
};