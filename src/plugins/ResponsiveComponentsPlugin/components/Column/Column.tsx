import React from 'react';
import { ViewProperties } from 'react-native';

import { withBlueRain, BlueRainType } from '../../../../index';
import { withWindowSize } from '../../redux/connect';

import isHidden from '../../helpers/isHidden';
import getComponentWidth from './helpers/getComponentWidth';
import getComponentOffset from './helpers/getComponentOffset';

export interface ColumnProperties extends ViewProperties {

	/**
	 * The width of the column on extra small screen.
	 */
	xs?: number;

	/**
	 * The number of columns to offset on extra small screen.
	 */
	xsOffset?: number;

	/**
	 * Hide this column on extra small screen.
	 */
	xsHidden?: boolean;

	/**
	 * The width of the column on small screen.
	 */
	sm?: number;

	/**
	 * The number of columns to offset on small screen.
	 */
	smOffset?: number;

	/**
	 * Hide this column on small screen.
	 */
	smHidden?: boolean;

	/**
	 * The width of the column on medium screen.
	 */
	md?: number;

	/**
	 * The number of columns to offset on medium screen.
	 */
	mdOffset?: number;

	/**
	 * Hide this column on medium screen.
	 */
	mdHidden?: boolean;

	/**
	 * The width of the column on large screen.
	 */
	lg?: number;

	/**
	 * The number of columns to offset on large screen.
	 */
	lgOffset?: number;

	/**
	 * Hide this column on large screen.
	 */
	lgHidden?: boolean;

	/**
	 * The width of the column on extra large screen.
	 */
	xl?: number;

	/**
	 * The number of columns to offset on extra large screen.
	 */
	xlOffset?: number;

	/**
	 * Hide this column on extra large screen.
	 */
	xlHidden?: boolean;

	children?: React.ReactNode[]
}

interface PropsFromAbove {
	bluerain: BlueRainType;
	windowSize: string;
	rowSize: number;
	gutter: number;
}

const Column = (props: ColumnProperties & PropsFromAbove) => {
	const {
		xs,
		xsOffset,
		xsHidden,
		sm,
		smOffset,
		smHidden,
		md,
		mdOffset,
		mdHidden,
		lg,
		lgOffset,
		lgHidden,
		xl,
		xlOffset,
		xlHidden,
		rowSize,
		windowSize,
		gutter,
		bluerain: BR,
		...rest
	} = props;

	const gridProps = {
		sm,
		smOffset,
		smHidden,
		md,
		mdOffset,
		mdHidden,
		xs,
		xsOffset,
		xsHidden,
		xl,
		xlOffset,
		xlHidden,
	 	lg,
		lgOffset,
		lgHidden,
		rowSize,
	};

	// debugger;
	if (isHidden(windowSize, gridProps)) {
		return null;
	}

	const View = BR.Components.get('View');
	const width = getComponentWidth(windowSize, gridProps);
	const marginLeft = getComponentOffset(windowSize, gridProps);
	const paddingLeft = gutter/2;
	const paddingRight = paddingLeft;

	const style = {
		width,
		flexDirection: 'column',
		marginLeft,
		paddingLeft,
		paddingRight
	};

	const stylesheet = BR.Utils.createStyleSheet([props.style, style]);
	return (<View {...rest} style={stylesheet} >{rest.children}</View>);
};

export default withBlueRain(withWindowSize(Column));
