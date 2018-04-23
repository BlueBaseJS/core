import { BlueRain, withBlueRain } from '../index';
import { ViewProperties,ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface CenterLayoutProperties extends ViewProperties {
	children: React.ReactNode[],
	style: ViewStyle
}

const CenterLayout = (props: CenterLayoutProperties & { bluerain: BlueRain }) => {

	const { bluerain: BR, style, ...other } = props;

	const defaultStyle = {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	};

	const stylesheet = [defaultStyle, style || {}];

	return <BR.Components.View style={stylesheet} {...other} />;
};

export default withBlueRain(CenterLayout);
