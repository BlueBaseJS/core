'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.routes = undefined;

var _SystemLayout = require('./layouts/SystemLayout.jsx');

var _SystemLayout2 = _interopRequireDefault(_SystemLayout);

var _Callbacks = require('./client-services/Callbacks/Callbacks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = exports.routes = function routes(apps, config) {

	var appRoutes = [];
	for (var key in apps) {
		// skip loop if the property is from prototype
		if (!apps.hasOwnProperty(key)) continue;

		var app = apps[key];
		if (app.routes) {
			appRoutes.push(app.routes());
		}
	}
	var routes = appRoutes[0];

	// const routes = {
	// 	path: '/',
	// 	component: SystemLayout,
	// 	childRoutes: [
	// 		{
	// 			// Apps
	// 			path: config && config.apps.routePrefix && config.apps.routePrefix || '/app', // path = /app
	// 			childRoutes: appRoutes
	// 		}
	// 	]
	// }

	(0, _Callbacks.runCallbacks)('bluerain.routes', routes);

	return routes;
};