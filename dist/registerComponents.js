'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    /* Register Layout Components */
    _index2.default.Components.register('SystemLayout', _SystemLayout2.default);
    _index2.default.Components.register('ResponsiveLayout', _ResponsiveLayout2.default);
    /* Register Pages */
    _index2.default.Components.register('Page', _Page2.default);
    _index2.default.Components.register('IndexPage', _IndexPage2.default);
    _index2.default.Components.register('NotFoundPage', _NotFoundPage2.default);
    /* Main System Component */
    _index2.default.Components.register('BlueRainApp', _SystemApp2.default);
    /* Grid Component */
    _index2.default.Components.register('Row', _Row2.default);
    _index2.default.Components.register('Column', _Column2.default);
};

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _SystemLayout = require('./layouts/SystemLayout');

var _SystemLayout2 = _interopRequireDefault(_SystemLayout);

var _ResponsiveLayout = require('./layouts/ResponsiveLayout');

var _ResponsiveLayout2 = _interopRequireDefault(_ResponsiveLayout);

var _Page = require('./pages/Page');

var _Page2 = _interopRequireDefault(_Page);

var _IndexPage = require('./pages/IndexPage');

var _IndexPage2 = _interopRequireDefault(_IndexPage);

var _NotFoundPage = require('./pages/NotFoundPage');

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _Column = require('./Components/GridView/Column');

var _Column2 = _interopRequireDefault(_Column);

var _Row = require('./Components/GridView/Row');

var _Row2 = _interopRequireDefault(_Row);

var _SystemApp = require('./SystemApp');

var _SystemApp2 = _interopRequireDefault(_SystemApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;