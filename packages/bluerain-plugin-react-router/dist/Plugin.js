'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluerainOs = require('@blueeast/bluerain-os');

var _bluerainOs2 = _interopRequireDefault(_bluerainOs);

var _reactRouterRedux = require('react-router-redux');

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactRouterPlugin = function (_Plugin) {
	_inherits(ReactRouterPlugin, _Plugin);

	function ReactRouterPlugin() {
		_classCallCheck(this, ReactRouterPlugin);

		return _possibleConstructorReturn(this, (ReactRouterPlugin.__proto__ || Object.getPrototypeOf(ReactRouterPlugin)).apply(this, arguments));
	}

	_createClass(ReactRouterPlugin, null, [{
		key: 'initialize',
		value: function initialize() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var ctx = arguments[1];


			// Create history
			var history = _bluerainOs2.default.Platform.getType() === 'web' ? (0, _createBrowserHistory2.default)() : (0, _createMemoryHistory2.default)();
			ctx.router = {};
			ctx.router.history = history;

			// Add filters to integrate with Redux
			ctx.Filters.add('bluerain.redux.reducers.bluerain', function ReduxRouterReducer(reducers) {
				return Object.assign(reducers, { router: _reactRouterRedux.routerReducer });
			});

			ctx.Filters.add('bluerain.redux.middlewares', function ReduxRouterMiddleware(middlewares) {
				middlewares.push((0, _reactRouterRedux.routerMiddleware)(history));
				return middlewares;
			});
		}
	}]);

	return ReactRouterPlugin;
}(_bluerainOs.Plugin);

ReactRouterPlugin.pluginName = 'ReactRouterPlugin';
ReactRouterPlugin.slug = 'router';
exports.default = ReactRouterPlugin;