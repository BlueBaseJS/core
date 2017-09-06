'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.history = exports.SystemRouter = undefined;

var _reactRouterNative = require('react-router-native');

Object.keys(_reactRouterNative).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _reactRouterNative[key];
		}
	});
});
Object.defineProperty(exports, 'SystemRouter', {
	enumerable: true,
	get: function get() {
		return _reactRouterNative.NativeRouter;
	}
});

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createMemoryHistory2.default)();

exports.history = history;