'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _actions = require('./actions');

var _getWindowSize = require('./getWindowSize');

var _getWindowSize2 = _interopRequireDefault(_getWindowSize);

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _initialState2.default)();
	var action = arguments[1];

	switch (action.type) {
		case _actions.SET_WINDOW_INFO:
			{
				var width = action.width,
				    height = action.height;

				return {
					width: width,
					height: height,
					size: (0, _getWindowSize2.default)(width)
				};
			}
		default:
			return state;
	}
};