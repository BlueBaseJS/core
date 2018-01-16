import React, { Component } from 'react';
import { isHidden, getComponentWidth, getComponentOffset } from '../helpers';
 import BR  from '../../index';

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
			size,
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
		rowSize
	};

	if (isHidden(size, gridProps)) {
		return null;
	}
	const View = BR.Components.get('View');

	return (
  <View
    {...rest}
    // tslint:disable-next-line:jsx-no-multiline-js
    style={[
	props.style, {
		width: getComponentWidth(size, gridProps),
		flexDirection: 'column',
		marginLeft: getComponentOffset(size, gridProps)
	}]}
  >
    {rest.children}
  </View>
	);

};



export default Column;
