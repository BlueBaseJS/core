'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.history = exports.SystemRouter = undefined;

var _reactRouterDom = require('react-router-dom');

Object.keys(_reactRouterDom).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _reactRouterDom[key];
		}
	});
});
Object.defineProperty(exports, 'SystemRouter', {
	enumerable: true,
	get: function get() {
		return _reactRouterDom.BrowserRouter;
	}
});

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

exports.history = history;