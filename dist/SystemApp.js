'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SystemRoutes = undefined;

exports.default = function (props) {
    var routes = {
        component: 'SystemLayout',
        props: props,
        children: [{
            component: 'Switch',
            props: { style: { flex: 1, flexGrow: 1 } },
            children: SystemRoutes()
        }]
    };
    return (0, _JsonSchemaToReact.parseJsonSchema)(_index2.default.Filters.run('bluerain.system.app.schema', routes));
};

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _JsonSchemaToReact = require('./utils/JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SystemRoutes = exports.SystemRoutes = function SystemRoutes() {
    var appRoutes = _index2.default.Apps.getComponentSchema();
    // Default Routes
    var systemRoutes = [{
        component: 'Route',
        props: {
            path: '/',
            exact: true,
            component: _index2.default.Components.get('IndexPage')
        }
    }].concat(appRoutes);
    // Dynamically add new routes
    systemRoutes = _index2.default.Filters.run('bluerain.system.routes', systemRoutes);
    // Add 404 at the end
    systemRoutes.push({
        component: 'Route',
        props: {
            component: _index2.default.Components.get('NotFoundPage')
        }
    });
    return systemRoutes;
};
;