'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('../lib/helpers');

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};

var cloneElements = function cloneElements(props) {
    // if size doesn't exist or is 0 default to 12
    var rowSize = props.size > 0 ? props.size : 12;
    return _react2.default.Children.map(props.children, function (element) {
        return _react2.default.cloneElement(element, { rowSize: rowSize });
    });
};
var Row = function Row(props) {
    var View = _index2.default.Components.get('View');
    if ((0, _helpers.isHidden)(props.size, props)) {
        return null;
    }
    return _react2.default.createElement(View, __assign({}, props, {
        // tslint:disable-next-line:jsx-no-multiline-js
        style: [props.style, { flexDirection: 'row',
            flexWrap: props.nowrap ? 'nowrap' : 'wrap',
            alignItems: props.alignItems,
            justifyContent: props.justifyContent
        }] }), cloneElements(props));
};
exports.default = Row;