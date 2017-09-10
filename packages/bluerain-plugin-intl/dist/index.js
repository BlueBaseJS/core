'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainOs = require('@blueeast/bluerain-os');

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withInternationalization = function withInternationalization(App, locale, ctx) {
	return function (props) {
		var messages = ctx.Filters.run('bluerain.intl.messages', {});
		return _react2.default.createElement(
			_reactIntl.IntlProvider,
			{ locale: locale, messages: messages[locale] },
			_react2.default.createElement(App, props)
		);
	};
};

var InternationalizationPlugin = function (_Plugin) {
	_inherits(InternationalizationPlugin, _Plugin);

	function InternationalizationPlugin() {
		_classCallCheck(this, InternationalizationPlugin);

		return _possibleConstructorReturn(this, (InternationalizationPlugin.__proto__ || Object.getPrototypeOf(InternationalizationPlugin)).apply(this, arguments));
	}

	_createClass(InternationalizationPlugin, null, [{
		key: 'initialize',
		value: function initialize() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var ctx = arguments[1];

			if (!config.locale) {
				config.locale = 'en';
			}
			var locale = config.locale;
			var localeData = require('react-intl/locale-data/' + locale);
			ctx.Components.register('FormattedMessage', _reactIntl.FormattedMessage);
			(0, _reactIntl.addLocaleData)(localeData);
			// Add internationalization to main system app
			ctx.Filters.add('bluerain.system.app', function AddInternationalizationToSystemApp(App) {
				return withInternationalization(App, locale, ctx);
			});
		}
	}]);

	return InternationalizationPlugin;
}(_bluerainOs.Plugin);

InternationalizationPlugin.pluginName = 'InternationalizationPlugin';
InternationalizationPlugin.slug = 'Internationalization';
exports.default = InternationalizationPlugin;