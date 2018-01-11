'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _WindowInfoPlugin = require('../plugins/WindowInfoPlugin');

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

/**
 * ResponsiveLayout component to create responsive layouts.
 *
 * @prop {string} windowSize The window size i.e. (xs|sm|md|lg|xl)
 * @prop {React.Component} default The default component to render, if a current size component is not given.
 * @prop {React.Component} xs The component to render when the screen size is extra-small.
 * @prop {React.Component} sm The component to render when the screen size is small.
 * @prop {React.Component} md The component to render when the screen size is medium.
 * @prop {React.Component} lg The component to render when the screen size is large.
 * @prop {React.Component} xl The component to render when the screen size is extra-large.
 */
function ResponsiveLayout(props) {
    var windowSize = props.windowSize,
        def = props.default,
        xs = props.xs,
        sm = props.sm,
        md = props.md,
        lg = props.lg,
        xl = props.xl,
        otherProps = __rest(props, ["windowSize", "default", "xs", "sm", "md", "lg", "xl"]); // eslint-disable-line no-unused-vars
    var Component = props[windowSize] ? props[windowSize] : def;
    if (typeof Component === 'string') {
        Component = _index2.default.Components.get(Component);
    }
    if (!Component) {
        throw new Error('Invalid Component.');
    }
    return _react2.default.createElement(Component, __assign({}, otherProps));
}
// ResponsiveLayout.defaultProps = {
// 	xs: undefined,
// 	sm: undefined,
// 	md: undefined,
// 	lg: undefined,
// 	xl: undefined
// };
exports.default = (0, _WindowInfoPlugin.withWindowSize)(ResponsiveLayout);