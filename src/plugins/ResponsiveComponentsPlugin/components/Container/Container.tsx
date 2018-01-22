import React from 'react';

import { withBlueRain, BlueRainType } from '../../../../index';
import { withWindowSize } from '../../redux/connect';

const Container = (props) => {

	const { bluerain: BR, ...others } = props;
	const View = BR.Components.get('View');

	let width;
	switch (props.windowSize) {
		case 'xl':
			width = 1140;
			break;
		case 'lg':
			width = 960;
			break;
		case 'md':
			width = 720;
			break;
		case 'sm':
			width = 540;
			break;
		case 'xs':
		default:
			width = '100%';
	}

	const style = {
		width,
		alignSelf: 'center'
	};
	const stylesheet = BR.Utils.createStyleSheet([props.style, style]);

	return (<View {...others} style={stylesheet} />);
};

export default withBlueRain(withWindowSize(Container));
