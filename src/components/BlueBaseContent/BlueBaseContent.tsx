import { MaybeRenderPropChildren, renderChildrenWithProps } from '../../utils';
import { BlueBase } from '../../BlueBase';
import { NavigatorProps } from '@bluebase/components';
import React from 'react';

export interface BlueBaseContentProps {
	BB: BlueBase,
	children?: MaybeRenderPropChildren<{ BB: BlueBase }>,
	navigator: NavigatorProps,
}

/**
 * 🏡 BlueBaseContent
 * @param props
 */
export const BlueBaseContent = (props: BlueBaseContentProps) => {

	const { BB, children, navigator } = props;

	const Navigation = BB.Components.resolve('Navigation');

	return (children)
	? renderChildrenWithProps(children, { BB })
	: <Navigation navigator={navigator} />;
};