'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

var _About = require('./About');

var _About2 = _interopRequireDefault(_About);

var _Responsive = require('./Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Contact = require('./Contact');

var _Contact2 = _interopRequireDefault(_Contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(props) {
  var match = props.match,
      appName = props.appName,
      BR = props.bluerain;


  var Page = BR.Components.get('Page');
  var Route = BR.Components.get('Route');
  var Redirect = BR.Components.get('Redirect');
  var Switch = BR.Components.get('Switch');

  return _react2.default.createElement(
    Page,
    null,
    _react2.default.createElement(_Header2.default, { match: match, appName: appName }),
    _react2.default.createElement(
      Switch,
      null,
      _react2.default.createElement(Route, { exact: true, path: '' + match.url, component: _Home2.default }),
      _react2.default.createElement(Route, { path: match.url + '/about', component: _About2.default }),
      _react2.default.createElement(Route, { path: match.url + '/responsive', component: _Responsive2.default }),
      _react2.default.createElement(Route, { path: match.url + '/contact', component: _Contact2.default }),
      _react2.default.createElement(Redirect, { path: '*', to: '' + match.url })
    )
  );
};

exports.default = App;