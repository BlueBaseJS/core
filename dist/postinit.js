'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _router = require('./router');

var _redux = require('./redux');

var _Page = require('./pages/Page');

var _Page2 = _interopRequireDefault(_Page);

var _IndexPage = require('./pages/IndexPage');

var _IndexPage2 = _interopRequireDefault(_IndexPage);

var _NotFoundPage = require('./pages/NotFoundPage');

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

	/* Main System Component */
	_index2.default.Components.register('BlueRainApp', function () {
		return _react2.default.createElement(
			_router.SystemRouter,
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
	_index2.default.Filters.add('bluerain.system.app', function AddReduxToSystemApp(App) {
		return withRedux(App);
	});

	// Pages
	_index2.default.Components.register('Page', _Page2.default);
	_index2.default.Components.register('IndexPage', _IndexPage2.default);
	_index2.default.Components.register('NotFoundPage', _NotFoundPage2.default);
};