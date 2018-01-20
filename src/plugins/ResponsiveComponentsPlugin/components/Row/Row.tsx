import React, { Component ,ReactElement} from 'react';
import { isHidden } from '../helpers';
import BR  from '../../../../index';
import { withWindowSize } from '../../redux/connect';

const cloneElements = (props) => {
  // if windowSize doesn't exist or is 0 default to 12
	const rowSize = props.size > 0 ? props.size : 12;
	return React.Children.map(props.children, element => React.cloneElement(element as ReactElement<any>, { rowSize }));
};

const Row = (props) => {

	const View = BR.Components.get('View');

	if (isHidden(props.windowSize, props)) {
		return null;
	}

	const style = {
		flexDirection: 'row',
		flexWrap: props.nowrap ? 'nowrap' : 'wrap',
		alignItems: props.alignItems,
		justifyContent: props.justifyContent
	};
	const styleSheet = BR.Utils.createStyleSheet([props.style, style]);

	return (
  <View {...props} style={[props.style,style]} >
    {cloneElements(props)}
  </View>
	);
};

export default withWindowSize(Row);
