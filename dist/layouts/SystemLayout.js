'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../index');

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

var SystemLayout = function SystemLayout(props) {
    var defaultStyle = _index2.default.Utils.createStyleSheet.create({
        flex: 1,
        overflow: 'auto',
        flexDirection: 'row'
    }, 'View');
    var children = props.children,
        style = props.style,
        Layout = props.Layout,
        other = __rest(props, ["children", "style", "Layout"]);
    var schema = {
        component: 'View',
        props: __assign({ onLayout: Layout, style: [defaultStyle, style] }, other),
        children: [{
            component: 'View',
            text: children,
            props: { style: { flexGrow: 1, flex: 1 } }
        }]
    };
    var layout = _index2.default.Filters.run('bluerain.system.app.layout', schema);
    return _index2.default.Utils.parseJsonSchema(layout);
};
exports.default = SystemLayout;