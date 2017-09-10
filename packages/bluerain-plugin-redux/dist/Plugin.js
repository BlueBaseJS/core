'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainOs = require('@blueeast/bluerain-os');

var _bluerainOs2 = _interopRequireDefault(_bluerainOs);

var _reactRedux = require('react-redux');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReduxPlugin = function (_BR$Plugin) {
	_inherits(ReduxPlugin, _BR$Plugin);

	function ReduxPlugin() {
		_classCallCheck(this, ReduxPlugin);

		return _possibleConstructorReturn(this, (ReduxPlugin.__proto__ || Object.getPrototypeOf(ReduxPlugin)).apply(this, arguments));
	}

	_createClass(ReduxPlugin, null, [{
		key: 'initialize',
		value: function initialize() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var ctx = arguments[1];


			// withRedux HOC Method
			var withRedux = function withRedux(App) {
				return function (props) {
					var store = (0, _index.createStore)(ctx);
					var ReduxProvider = ctx.Filters.run('bluerain.redux.provider', _reactRedux.Provider);
					return _react2.default.createElement(
						ReduxProvider,
						{ store: store },
						_react2.default.createElement(App, props)
					);
				};
			};

			// Add redux to main system app
			ctx.Filters.add('bluerain.system.app', function AddReduxToSystemApp(App) {
				return withRedux(App);
			});
		}
	}]);

	return ReduxPlugin;
}(_bluerainOs2.default.Plugin);

ReduxPlugin.pluginName = 'Redux';
ReduxPlugin.slug = 'redux';
exports.default = ReduxPlugin;