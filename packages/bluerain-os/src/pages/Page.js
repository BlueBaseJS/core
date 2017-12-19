/* @flow */
import React from 'react';
import  { withBlueRain } from '../Provider';
import  createStyleSheet  from '../utils/createStyleSheet';

const defaultStyle = createStyleSheet({
	flex: 1,
	overflow: 'auto',
}, 'View');

const  Page = (props) => {
// eslint-disable-next-line
	const { children, style ,bluerain } = props;
	const View = bluerain.Components.get('View');
	return (<View style={[defaultStyle, style]}>{children}</View>);
};


export default withBlueRain(Page);
