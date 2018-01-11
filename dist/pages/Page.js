'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Provider = require('../Provider');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page(props) {
    var defaultStyle = _index2.default.Utils.createStyleSheet.create({
        flex: 1,
        overflow: 'auto'
    }, 'View');
    var children = props.children,
        style = props.style,
        bluerain = props.bluerain;
    var View = bluerain.Components.get('View');
    return _react2.default.createElement(View, { style: [defaultStyle, style] }, children);
};
exports.default = (0, _Provider.withBlueRain)(Page);