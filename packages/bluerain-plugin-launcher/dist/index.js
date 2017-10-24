'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluerainOs = require('@blueeast/bluerain-os');

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from 'react';


/**
 * Main Launcher Plugin class.
 * @property {string} pluginName "LauncherPlugin"
 * @property {string} slug "launcher"
 */
var LauncherPlugin = function (_Plugin) {
	_inherits(LauncherPlugin, _Plugin);

	function LauncherPlugin() {
		_classCallCheck(this, LauncherPlugin);

		return _possibleConstructorReturn(this, (LauncherPlugin.__proto__ || Object.getPrototypeOf(LauncherPlugin)).apply(this, arguments));
	}

	_createClass(LauncherPlugin, null, [{
		key: 'initialize',
		value: function initialize() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var ctx = arguments[1];


			// Add launcher
			ctx.Components.replace('IndexPage', _layout2.default);
		}
	}]);

	return LauncherPlugin;
}(_bluerainOs.Plugin);

LauncherPlugin.pluginName = 'LauncherPlugin';
LauncherPlugin.slug = 'launcher';
exports.default = LauncherPlugin;