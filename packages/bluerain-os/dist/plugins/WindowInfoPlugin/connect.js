'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var withWindowInfo = function withWindowInfo(Component) {
	return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Component);
};

exports.default = withWindowInfo;