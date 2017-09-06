'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = initialState;

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _getWindowSize = require('./getWindowSize');

var _getWindowSize2 = _interopRequireDefault(_getWindowSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The state of current window or screen. Stored in `bluerain.window` in the redux store.
 * @property {number} width The window width
 * @property {number} height The window height
 * @property {"xs" | "sm" | "md" | "lg" | "xl"} size The window size i.e. (xs|sm|md|lg|xl)
 */
function initialState() {
	var dimentions = _reactxp2.default.UserInterface.measureWindow();

	var initState = {
		width: dimentions.width || 0,
		height: dimentions.height || 0
	};

	initState.size = (0, _getWindowSize2.default)(dimentions.width);
	return initState;
}