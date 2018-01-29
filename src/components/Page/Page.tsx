import React from 'react';
import { ViewProperties } from '@blueeast/bluerain-ui-interfaces';
import { BlueRainType, withBlueRain } from '../../index';
import defaultStyles from './stylesheet';

const  Page = (props: ViewProperties & { bluerain: BlueRainType }) => {

	const { style, bluerain: BR, ...others } = props;
	const View = BR.Components.get('View');

	const stylesheet = [
		BR.Utils.createStyleSheet(defaultStyles),
		BR.Utils.createStyleSheet(style || {})
	];

	return (<View style={stylesheet} {...others} />);
};

export default withBlueRain(Page);
