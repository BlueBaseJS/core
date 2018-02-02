import { BlueRainType,withBlueRain } from '../index';
import { ViewProperties,ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface CenterLayoutProperties extends ViewProperties {
	children: React.ReactNode[],
	style: ViewStyle
}

const CenterLayout = (props: CenterLayoutProperties & { bluerain: BlueRainType }) => {

	const { bluerain: BR, style, ...other } = props;
	const View = BR.Components.get('View');

	const defaultStyle = {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	};

	const stylesheet = [
		BR.Utils.createStyleSheet(defaultStyle),
		BR.Utils.createStyleSheet(style || {})
	];
	return (<View style={defaultStyle} {...other} />);
};

export default withBlueRain(CenterLayout);
