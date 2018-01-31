import React from 'react';
import { withBlueRain, BlueRainType } from '../index';
import { ViewProperties, ViewStyles } from '@blueeast/bluerain-ui-interfaces';

export interface CenterLayoutProperties extends ViewProperties {
	children: React.ReactNode[],
	style: ViewStyles
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
