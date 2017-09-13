'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _JsonSchemaToReact = require('./utils/JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Routes = function Routes() {

	var appRoutes = _index2.default.Apps.getComponentSchema();

	var routes = {
		component: 'SystemLayout',
		children: [{
			component: 'Switch',
			children: [{
				component: 'Route',
				props: {
					path: '/',
					exact: true,
					component: _index2.default.Components.get('IndexPage')
				}
			}].concat(_toConsumableArray(appRoutes), [{
				component: 'Route',
				props: {
					component: _index2.default.Components.get('NotFoundPage')
				}
			}])
		}]
	};

	return (0, _JsonSchemaToReact.parseJsonSchema)(_index2.default.Filters.run('bluerain.system.routes', routes));
};

exports.default = Routes;