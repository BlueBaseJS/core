'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Callbacks = require('./Callbacks');

var _ComponentRegistry = require('./ComponentRegistry');

var _JsonSchemaToReact = require('./JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		var component = app.routes;
		if (app.routes) {
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

	// const routes = {
	// 	component: 'div', // Change this to View with ReactXP
	// 	children: appRoutes
	// 	// children: [{
	// 	// 	component: 'Route',
	// 	// 	props: {
	// 	// 		path: '/app/hello-world',
	// 	// 		key: 'xyz',
	// 	// 		component: () => <div>hello what??</div>
	// 	// 	}
	// 	// }]
	// };

	var routes = {
		component: 'div', // Change this to View with ReactXP
		// props: {
		// 	path: '/',
		// 	component: () => <div>hello what??</div>
		// }
		children: appRoutes
		// children: [{
		// 	component: 'Route',
		// 	props: {
		// 		path: '/app/hello-world',
		// 		key: 'xyz',
		// 		component: () => <div>hello what??</div>
		// 	}
		// }]
	};

	// return (<Route path="/" component={() => <div>hello what??</div>} />);
	return (0, _JsonSchemaToReact.parseJsonSchema)((0, _Callbacks.runCallbacks)('bluerain.routes', routes));
};

exports.default = Routes;