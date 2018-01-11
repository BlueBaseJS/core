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
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Column = function Column(props) {
    var sm = props.sm,
        smOffset = props.smOffset,
        smHidden = props.smHidden,
        xs = props.xs,
        xsOffset = props.xsOffset,
        xsHidden = props.xsHidden,
        xl = props.xl,
        xlOffset = props.xlOffset,
        xlHidden = props.xlHidden,
        md = props.md,
        mdOffset = props.mdOffset,
        mdHidden = props.mdHidden,
        lg = props.lg,
        lgOffset = props.lgOffset,
        lgHidden = props.lgHidden,
        rowSize = props.rowSize,
        size = props.size,
        rest = __rest(props, ["sm", "smOffset", "smHidden", "xs", "xsOffset", "xsHidden", "xl", "xlOffset", "xlHidden", "md", "mdOffset", "mdHidden", "lg", "lgOffset", "lgHidden", "rowSize", "size"]);
    var gridProps = {
        sm: sm,
        smOffset: smOffset,
        smHidden: smHidden,
        md: md,
        mdOffset: mdOffset,
        mdHidden: mdHidden,
        xs: xs,
        xsOffset: xsOffset,
        xsHidden: xsHidden,
        xl: xl,
        xlOffset: xlOffset,
        xlHidden: xlHidden,
        lg: lg,
        lgOffset: lgOffset,
        lgHidden: lgHidden,
        rowSize: rowSize
    };
    if ((0, _helpers.isHidden)(size, gridProps)) {
        return null;
    }
    var View = _index2.default.Components.get('View');
    return _react2.default.createElement(View, __assign({}, rest, {
        // tslint:disable-next-line:jsx-no-multiline-js
        style: [props.style, {
            width: (0, _helpers.getComponentWidth)(size, gridProps),
            flexDirection: 'column',
            marginLeft: (0, _helpers.getComponentOffset)(size, gridProps)
        }] }), rest.children);
};
exports.default = Column;