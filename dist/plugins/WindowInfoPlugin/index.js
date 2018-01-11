'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withWindowSize = exports.withWindowInfo = undefined;

var _ = require('../../');

var _2 = _interopRequireDefault(_);

var _Plugin = require('../../models/Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _getWindowSize = require('./getWindowSize');

var _getWindowSize2 = _interopRequireDefault(_getWindowSize);

var _connect = require('./connect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
}; // BR.Plugin doesn't exist yet.

var WindowInfoPlugin = /** @class */function (_super) {
    __extends(WindowInfoPlugin, _super);
    function WindowInfoPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowInfoPlugin.getCurrentSize = function () {
        var state = (0, _initialState2.default)();
        return state.size;
    };
    WindowInfoPlugin.pluginName = 'WindowInfoPlugin';
    WindowInfoPlugin.slug = 'window-info';
    WindowInfoPlugin.hooks = {
        'bluerain.redux.initialState': function bluerainReduxInitialState(state, ctx) {
            return __assign({}, state, {
                bluerain: {
                    window: (0, _initialState2.default)()
                }
            });
        },
        'bluerain.redux.reducers.bluerain': function bluerainReduxReducersBluerain(reducers, ctx) {
            return __assign({}, reducers, {
                window: _reducer2.default
            });
        },
        'bluerain.redux.middlewares': function bluerainReduxMiddlewares(middlewares, ctx) {
            var middleware = function middleware(store) {
                return function (next) {
                    return function (action) {
                        if (action.type !== '@@BLUERAIN/SET_WINDOW_INFO') {
                            return next(action);
                        }
                        var state = store.getState();
                        var prevSize = state.bluerain.window.size;
                        var newSize = (0, _getWindowSize2.default)(action.width);
                        if (prevSize !== newSize) {
                            _2.default.Events.emit('plugin.window_info.resize', newSize, prevSize);
                        }
                        next(action);
                    };
                };
            };
            middlewares.push(middleware);
            return middlewares;
        }
    };
    WindowInfoPlugin.uses = {
        components: [],
        hooks: []
    };
    return WindowInfoPlugin;
}(_Plugin2.default);
exports.default = WindowInfoPlugin;
exports.withWindowInfo = _connect.withWindowInfo;
exports.withWindowSize = _connect.withWindowSize;