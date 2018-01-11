'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withWindowSize = exports.withWindowInfo = undefined;

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var mapStateToProps = function mapStateToProps(state) {
    return {
        window: state.bluerain.window
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    return {
        setWindowDimentions: function setWindowDimentions(w, h) {
            return dispatch((0, _actions.setWindowDimentions)(w, h));
        }
    };
};
var withWindowInfo = exports.withWindowInfo = function withWindowInfo(Component) {
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Component);
};
var withWindowSize = exports.withWindowSize = function withWindowSize(Component) {
    return (0, _reactRedux.connect)(function (state) {
        return {
            windowSize: state.bluerain.window.size
        };
    }, {})(Component);
};