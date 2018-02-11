import { BlueRain, withBlueRain } from '../../index';
import { ViewProperties } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';
import defaultStyles from './stylesheet';

const  Page = (props: ViewProperties & { bluerain: BlueRain }) => {

	const { style, bluerain: BR, ...others } = props;

	const stylesheet = [
		BR.Utils.createStyleSheet(defaultStyles),
		BR.Utils.createStyleSheet(style || {})
	];

	return <BR.Components.View style={stylesheet} {...others} />;
};

export default withBlueRain(Page);
