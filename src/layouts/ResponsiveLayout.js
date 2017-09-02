/* @flow */
import React, { type ComponentType } from 'react';

import BR from '../index';
import { withWindowInfo } from '../plugins/WindowInfoPlugin';

type ResponsiveLayoutProps = {
	window: {
		width: number,
		height: number,
		size: string
	},
	default: ComponentType<any> | string,
	xs?: ComponentType<any>,
	sm?: ComponentType<any>,
	md?: ComponentType<any>,
	lg?: ComponentType<any>,
	xl?: ComponentType<any>,
}

/**
 * ResponsiveLayout component to create responsive layouts.
 *
 * @prop {object} window The window state passed from the store
 * @prop {number} window.width The window width
 * @prop {number} window.height The window height
 * @prop {string} window.width The window size i.e. (xs|sm|md|lg|xl)
 * @prop {React.Component} default The default component to render, if a current size component is not given.
 * @prop {React.Component} xs The component to render when the screen size is extra-small.
 * @prop {React.Component} sm The component to render when the screen size is small.
 * @prop {React.Component} md The component to render when the screen size is medium.
 * @prop {React.Component} lg The component to render when the screen size is large.
 * @prop {React.Component} xl The component to render when the screen size is extra-large.
 */
function ResponsiveLayout(props: ResponsiveLayoutProps) {
	const { window, default: def, xs, sm, md, lg, xl, ...otherProps } = props; // eslint-disable-line no-unused-vars
	let Component = (props[window.size]) ? props[window.size] : def;

	if (typeof Component === 'string') {
		Component = BR.Components.get(Component);
	}

	if (!Component) {
		throw new Error('Invalid Component.');
	}

	return <Component {...otherProps} />;
}

ResponsiveLayout.defaultProps = {
	xs: undefined,
	sm: undefined,
	md: undefined,
	lg: undefined,
	xl: undefined,
};

export default withWindowInfo(ResponsiveLayout);
