'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainOs = require('@blueeast/bluerain-os');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('hello', _bluerainOs.withBlueRain);

var App = function App(props) {

	console.log(props);
	return _react2.default.createElement(
		'p',
		null,
		'Hey There'
	);
};

App = (0, _bluerainOs.withBlueRain)(App);

App.appName = 'Hello World';

exports.default = App;