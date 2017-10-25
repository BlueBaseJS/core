/* @flow */
import React, { Node } from 'react';

import BR from '../index';
import { withWindowSize } from '../plugins/WindowInfoPlugin';

export type ResponsiveLayoutProps = {
	windowSize: string;
	default: Node | string;
	xs?: Node;
	sm?: Node;
	md?: Node;
	lg?: Node;
	xl?: Node;
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
function ResponsiveLayout(props: ResponsiveLayoutProps) {
	const { windowSize, default: def, xs, sm, md, lg, xl, ...otherProps } = props; // eslint-disable-line no-unused-vars
	let Component = props[windowSize] ? props[windowSize] : def;

	if (typeof Component === 'string') {
		Component = BR.Components.get(Component);
	}

	if (!Component) {
		throw new Error('Invalid Component.');
	}
	// $FlowFixMe
	return <Component {...otherProps} />;
}

ResponsiveLayout.defaultProps = {
	xs: undefined,
	sm: undefined,
	md: undefined,
	lg: undefined,
	xl: undefined
};

export default withWindowSize(ResponsiveLayout);
