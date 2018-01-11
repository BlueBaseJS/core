'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withWindowInfo = _index2.default.Plugins.get('window-info').withWindowInfo;
var Grid = function Grid(props) {
    var View = _index2.default.Components.get('View');
    var Text = _index2.default.Components.get('Text');
    return _react2.default.createElement(View, null, _react2.default.createElement(_Row2.default, { size: 12 }, _react2.default.createElement(_Column2.default, { size: props.window.size, style: { backgroundColor: 'blue' }, xl: 3, xs: 3, sm: 12, lg: 6, md: 3 }, _react2.default.createElement(Text, null, "First Column")), _react2.default.createElement(_Column2.default, { size: props.window.size, style: { backgroundColor: 'green' }, xl: 6, xs: 3, sm: 12, lg: 6, md: 6 }, _react2.default.createElement(Text, null, "Second Column")), _react2.default.createElement(_Column2.default, { size: props.window.size, style: { backgroundColor: 'red' }, xl: 6, xs: 6, sm: 12, lg: 12, md: 3 }, _react2.default.createElement(Text, null, "Third Column"))));
};
exports.default = withWindowInfo(Grid);