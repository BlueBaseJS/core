'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.routes = exports.reducers = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _routes = require('./routes');

var _reactRouterDom = require('react-router-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boot = function boot(options) {
	var apps = options.apps,
	    plugins = options.plugins,
	    config = options.config;

	// Add the client app start up code to a function as window.webappStart.
	// The webapp's full HTML will check and call it once the js-content
	// DOM is created.

	var finalRoutes = (0, _routes.routes)(apps);
	console.log('linked');
	return _react2.default.createElement(
		_reactRouterDom.BrowserRouter,
		null,
		_react2.default.createElement(_reactRouterDom.Route, { component: finalRoutes })
	);
};

exports.default = boot;
exports.reducers = _reducers2.default;
exports.routes = _routes.routes;