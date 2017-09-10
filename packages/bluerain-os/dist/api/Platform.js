'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _isElectron = require('is-electron');

var _isElectron2 = _interopRequireDefault(_isElectron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This interface provides information about the OS or runtime platform on which the app is running.
 */
var Platform = function () {
	function Platform() {
		_classCallCheck(this, Platform);
	}

	_createClass(Platform, null, [{
		key: 'getType',


		/**
   * @return {string} PlatformType ('web' | 'server' | 'ios' | 'android' | 'windows' | 'electron')
   */
		value: function getType() {

			if (Platform.isOnServer === true) {
				return 'server';
			}

			var type = _reactxp2.default.Platform.getType();

			if (type === 'web' && (0, _isElectron2.default)()) {
				return 'electron';
			}

			return type;
		}

		/**
   * Set the Platform to 'server'.
   * Useful to see if the app is rendering on server due to SSR.
   *
   * @param {boolean} mode
   */

	}, {
		key: 'setServerMode',
		value: function setServerMode() {
			var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			Platform.isOnServer = mode;
		}
	}]);

	return Platform;
}();

Platform.isOnServer = true;
exports.default = Platform;