import React from 'react';
import { BlueRainType, withBlueRain } from '../../index';

export type PageProps = {
	children: Node,
	style: {},
	bluerain: BlueRainType
};

const  Page = (props: PageProps) => {

	const { style, bluerain: BR, ...others } = props;
	const View = BR.Components.get('View');

	const stylesheet = BR.Utils.createStyleSheet([{
		flex: 1,
		overflow: 'auto',
	}, style]);

	return (<View style={stylesheet} {...others} />);
};

export default withBlueRain(Page);
