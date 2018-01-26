import React from 'react';
import { ViewProperties } from 'react-native';
import { BlueRainType, withBlueRain } from '../../index';

const  Page = (props: ViewProperties & { bluerain: BlueRainType }) => {

	const { style, bluerain: BR, ...others } = props;
	const View = BR.Components.get('View');

	const stylesheet = BR.Utils.createStyleSheet([{
		flex: 1,
		overflow: 'auto',
	}, style]);

	return (<View style={stylesheet} {...others} />);
};

export default withBlueRain(Page);
