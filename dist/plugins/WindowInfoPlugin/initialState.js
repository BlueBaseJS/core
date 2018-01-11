'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initialState;

var _getWindowSize = require('./getWindowSize');

var _getWindowSize2 = _interopRequireDefault(_getWindowSize);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initialState() {
    var dimentions = _index2.default.Dimensions;
    var initState = {
        width: dimentions.width || 0,
        height: dimentions.height || 0,
        size: (0, _getWindowSize2.default)(dimentions.width)
    };
    return initState;
}