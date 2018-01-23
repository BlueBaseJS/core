import React from 'react';

import { isHidden, getComponentWidth, getComponentOffset } from '../helpers';
import { withBlueRain, BlueRainType } from '../../../../index';
import { withWindowSize } from '../../redux/connect';

const Column = (props) => {
	const {
      sm,
      smOffset,
		 	smHidden,
		  xs,
      xsOffset,
			xsHidden,
			xl,
      xlOffset,
      xlHidden,
      md,
      mdOffset,
      mdHidden,
      lg,
      lgOffset,
			lgHidden,
			rowSize,
			windowSize,
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
console.log('hello');
	const View = BR.Components.get('View');
	const width = getComponentWidth(windowSize, gridProps);
	const marginLeft = getComponentOffset(windowSize, gridProps);

	const style = {
		width,
		flexDirection: 'column',
		marginLeft
	};

	const stylesheet = BR.Utils.createStyleSheet([props.style, style]);
	return (<View {...rest} style={stylesheet} >{rest.children}</View>);
};

export default withBlueRain(withWindowSize(Column));
