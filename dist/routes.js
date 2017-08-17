'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouterDom = require('react-router-dom');

var _SystemLayout = require('./layouts/SystemLayout1');

var _SystemLayout2 = _interopRequireDefault(_SystemLayout);

var _Callbacks = require('./Callbacks');

var _ComponentRegistry = require('./ComponentRegistry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ComponentRegistry.registerComponent)('Route', _reactRouterDom.Route);

var Routes = function Routes(props) {
	var apps = props.apps,
	    config = props.config;

	// const appRoutes = [];
	// for (const key in apps) {
	// 	// skip loop if the property is from prototype
	// 	if (!apps.hasOwnProperty(key)) continue;

	// 	let appName = camelCase(`${key}App`);
	// 	appName = appName.charAt(0).toUpperCase() + appName.slice(1);
	// 	console.log(appName);
	// 	const app = apps[key];
	// 	if (app.routes) {
	// 		appRoutes.push({
	// 			name: appName,
	// 			slug: key,
	// 			routes: app.routes
	// 		});
	// 	}
	// }

	console.log('checking routes 1', apps);
	// console.log('mapping', appRoutes.map(a => a.routes));
	// const appPrefix = config && config.apps.routePrefix && config.apps.routePrefix || '/app'; // path = /app

	// const routes = {
	// 	component: 'div',
	// 	children: [
	// 		{
	// 			// Apps
	// 			childRoutes: appRoutes
	// 		}
	// 	]
	// };

	console.log('checking routes 2');
	// runCallbacks('bluerain.routes', routes);

	var renderApp = function renderApp(app, slug) {
		var AppComponent = app.routes;
		console.log('rendering app', app);
		console.log('rendering app', AppComponent);
		return _react2.default.createElement(AppComponent, null);
	};

	return _react2.default.createElement(
		'div',
		null,
		Object.keys(apps).map(function (key) {
			return renderApp(apps[key]);
		})
	);
};

exports.default = Routes;