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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * ResponsiveLayout component to create responsive layouts.
 *
 * @prop {object} window The window state passed from the store
 * @prop {number} window.width The window width
 * @prop {number} window.height The window height
 * @prop {string} window.size The window size i.e. (xs|sm|md|lg|xl)
 * @prop {React.Component} default The default component to render, if a current size component is not given.
 * @prop {React.Component} xs The component to render when the screen size is extra-small.
 * @prop {React.Component} sm The component to render when the screen size is small.
 * @prop {React.Component} md The component to render when the screen size is medium.
 * @prop {React.Component} lg The component to render when the screen size is large.
 * @prop {React.Component} xl The component to render when the screen size is extra-large.
 */
function ResponsiveLayout(props) {
	var window = props.window,
	    def = props.default,
	    xs = props.xs,
	    sm = props.sm,
	    md = props.md,
	    lg = props.lg,
	    xl = props.xl,
	    otherProps = _objectWithoutProperties(props, ['window', 'default', 'xs', 'sm', 'md', 'lg', 'xl']); // eslint-disable-line no-unused-vars


	var Component = props[window.size] ? props[window.size] : def;

	if (typeof Component === 'string') {
		Component = _index2.default.Components.get(Component);
	}

	if (!Component) {
		throw new Error('Invalid Component.');
	}

	return _react2.default.createElement(Component, otherProps);
}

ResponsiveLayout.defaultProps = {
	xs: undefined,
	sm: undefined,
	md: undefined,
	lg: undefined,
	xl: undefined
};

exports.default = (0, _WindowInfoPlugin.withWindowInfo)(ResponsiveLayout);