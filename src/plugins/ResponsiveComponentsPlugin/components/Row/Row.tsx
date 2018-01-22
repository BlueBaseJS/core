import React, { ReactElement } from 'react';

import { isHidden } from '../helpers';
import { withBlueRain, BlueRainType } from '../../../../index';
import { withWindowSize } from '../../redux/connect';

const cloneElements = (props) => {
  // if windowSize doesn't exist or is 0 default to 12
	const rowSize = props.size > 0 ? props.size : 12;
	return React.Children.map(props.children, element => React.cloneElement(element as ReactElement<any>, { rowSize }));
};

const Row = (props) => {

	const { bluerain: BR, ...others } = props;
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
	const stylesheet = BR.Utils.createStyleSheet([props.style, style]);

	return (
  <View {...others} style={stylesheet} >
    {cloneElements(props)}
  </View>
	);
};

export default withBlueRain(withWindowSize(Row));
