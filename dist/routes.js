'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRouterDom = require('react-router-dom');

var _Callbacks = require('./Callbacks');

var _ComponentRegistry = require('./ComponentRegistry');

var _JsonSchemaToReact = require('./JsonSchemaToReact');

(0, _ComponentRegistry.registerComponent)('Route', _reactRouterDom.Route);

var Routes = function Routes(props) {
	var apps = props.apps,
	    config = props.config;


	var appPrefix = config && config.apps.routePrefix && config.apps.routePrefix || '/app'; // path = /app

	var appRoutes = [];
	for (var key in apps) {

		// skip loop if the property is from prototype
		if (!Object.prototype.hasOwnProperty.call(apps, key)) continue;

		var app = apps[key];
		var component = app.getComponent();
		console.log('app', component);
		if (component) {
			appRoutes.push({
				component: 'Route',
				props: {
					path: appPrefix + '/' + key,
					key: key,
					component: component
				}
			});
		}
	}

	var routes = {
		component: 'div', // TODO: Change this to View with ReactXP
		children: appRoutes
	};

	return (0, _JsonSchemaToReact.parseJsonSchema)((0, _Callbacks.runCallbacks)('bluerain.routes', routes));
};

exports.default = Routes;