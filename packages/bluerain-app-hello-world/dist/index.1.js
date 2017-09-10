'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainOs = require('@blueeast/bluerain-os');

var _bluerainOs2 = _interopRequireDefault(_bluerainOs);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _About = require('./components/About');

var _Responsive = require('./components/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Contact = require('./components/Contact');

var _Contact2 = _interopRequireDefault(_Contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = void 0,
    Route = void 0,
    Redirect = void 0,
    Switch = void 0;

var HelloWorldApp = function (_App) {
	_inherits(HelloWorldApp, _App);

	function HelloWorldApp() {
		_classCallCheck(this, HelloWorldApp);

		return _possibleConstructorReturn(this, (HelloWorldApp.__proto__ || Object.getPrototypeOf(HelloWorldApp)).apply(this, arguments));
	}

	_createClass(HelloWorldApp, [{
		key: 'render',
		value: function render() {
			var match = this.props.match;

			return _react2.default.createElement(
				Page,
				null,
				_react2.default.createElement(_Header2.default, { match: match, appName: this.constructor.appName }),
				_react2.default.createElement(
					Switch,
					null,
					_react2.default.createElement(Route, { exact: true, path: '' + match.url, component: _Home2.default }),
					_react2.default.createElement(Route, { path: match.url + '/about', component: _About.About }),
					_react2.default.createElement(Route, { path: match.url + '/responsive', component: _Responsive2.default }),
					_react2.default.createElement(Route, { path: match.url + '/contact', component: _Contact2.default }),
					_react2.default.createElement(Redirect, { path: '*', to: '' + match.url })
				)
			);
		}
	}], [{
		key: 'initialize',
		value: function initialize(config, ctx) {
			Page = ctx.Components.get('Page');
			Route = ctx.Components.get('Route');
			Redirect = ctx.Components.get('Redirect');
			Switch = ctx.Components.get('Switch');

			// Add translations
			ctx.Filters.add('bluerain.intl.messages', function helloWorldAppTranslations(messages) {
				var en = require('./lang/en.json');
				var ur = require('./lang/ur.json');
				messages.en = Object.assign(messages.en ? messages.en : {}, en);
				messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);
				return messages;
			});
		}
	}]);

	return HelloWorldApp;
}(_bluerainOs.App);

// const App = withBlueRain((props) => {

// 	console.log(props);
// 	return <p>Hey There</p>;
// });
// App.appName = 'Hello World';

// console.log('hello')
// export default App;


HelloWorldApp.appName = 'Hello World';
exports.default = HelloWorldApp;