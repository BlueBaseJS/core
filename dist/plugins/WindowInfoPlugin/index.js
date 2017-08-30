'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withWindowInfo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FilterRegistry = require('../../registries/FilterRegistry');

var _FilterRegistry2 = _interopRequireDefault(_FilterRegistry);

var _Plugin2 = require('../../models/Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WindowInfoPlugin = function (_Plugin) {
	_inherits(WindowInfoPlugin, _Plugin);

	function WindowInfoPlugin() {
		_classCallCheck(this, WindowInfoPlugin);

		return _possibleConstructorReturn(this, (WindowInfoPlugin.__proto__ || Object.getPrototypeOf(WindowInfoPlugin)).apply(this, arguments));
	}

	_createClass(WindowInfoPlugin, null, [{
		key: 'initialize',
		value: function initialize() {
			_FilterRegistry2.default.add('bluerain.redux.reducers.bluerain', function AddReducers(reducers) {
				return Object.assign({}, reducers, {
					window: _reducer2.default
				});
			});
		}
	}]);

	return WindowInfoPlugin;
}(_Plugin3.default);

WindowInfoPlugin.pluginName = 'WindowInfoPlugin';
WindowInfoPlugin.slug = 'window-info';
exports.default = WindowInfoPlugin;
exports.withWindowInfo = _connect2.default;