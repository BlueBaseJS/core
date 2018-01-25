import React from 'react';

import { withBlueRain, BlueRainType } from '../../../../index';
import { withWindowSize } from '../../redux/connect';
import { WindowSize } from '../../typings';

export interface ResponsiveLayoutProperties {
	default: React.ComponentType;
	xs?: React.ComponentType;
	sm?: React.ComponentType;
	md?: React.ComponentType;
	lg?: React.ComponentType;
	xl?: React.ComponentType;
}

interface AllProps extends ResponsiveLayoutProperties {
	bluerain: BlueRainType;
	windowSize: WindowSize
}

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
function ResponsiveLayout(props: AllProps) {
	const {
		windowSize,
		default: def,
		xs,
		sm,
		md,
		lg,
		xl,
		bluerain: BR,
		...otherProps
	} = props;

	let Component = props[windowSize] ? props[windowSize] : def;

	if (typeof Component === 'string') {
		Component = BR.Components.get(Component);
	}

	if (!Component) {
		throw new Error('Invalid Component.');
	}

	return <Component {...otherProps} />;
}

export default withBlueRain(withWindowSize(ResponsiveLayout));
