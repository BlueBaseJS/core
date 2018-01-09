
import React from 'react';
import { withBlueRain } from '../Provider';
import BR, {BlueRainType} from '../index';

interface Iprops {
	children:Node,
	style:{},
	bluerain:BlueRainType
}
const  Page = (props:Iprops) => {
	const defaultStyle = BR.Utils.createStyleSheet({
		flex: 1,
		overflow: 'auto',
	}, 'View');

	const { children, style, bluerain } = props;
	const View = bluerain.Components.get('View');
	return (<View style={[defaultStyle, style]}>{children}</View>);
};

export default withBlueRain(Page);
