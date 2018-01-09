/* @flow */
import React, { Component ,ReactElement} from 'react';
 import { isHidden } from '../lib/helpers';
 import BR  from '../../index';

 const cloneElements = (props) => {
    // if size doesn't exist or is 0 default to 12
	const rowSize = props.size > 0 ? props.size : 12;
	return React.Children.map(props.children, element => React.cloneElement(element as ReactElement<any>, { rowSize }));
};

const Row = (props) => {

	const View = BR.Components.get('View');
	if (isHidden(props.size, props)) {
		return null;
	}
	return (
  <View
    {...props}
    // tslint:disable-next-line:jsx-no-multiline-js
    style={[props.style,
	{ flexDirection: 'row',
		flexWrap: props.nowrap ? 'nowrap' : 'wrap',
		alignItems: props.alignItems,
		justifyContent: props.justifyContent
	}]}
  >
    {cloneElements(props)}
  </View>
	);

};



export default Row;
