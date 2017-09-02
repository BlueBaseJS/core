'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require('./index');

var _SystemLayout = require('./layouts/SystemLayout');

var _SystemLayout2 = _interopRequireDefault(_SystemLayout);

var _JsonSchemaToReact = require('./utils/JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Routes = function Routes() {

	var appRoutes = _index.blueRain.apps.getComponentSchema();

	var routes = {
		component: _SystemLayout2.default,
		children: [{
			component: 'Switch',
			children: [{
				component: 'Route',
				props: {
					path: '/',
					exact: true,
					component: _index.ComponentRegistry.get('IndexPage')
				}
			}].concat(_toConsumableArray(appRoutes), [{
				component: 'Route',
				props: {
					component: _index.ComponentRegistry.get('404Page')
				}
			}])
		}]
	};

	return (0, _JsonSchemaToReact.parseJsonSchema)(_index.blueRain.filters.run('bluerain.system.routes', routes));
};

exports.default = Routes;