/* @flow */
import React from 'react';
import BR, { withBlueRain } from '../Provider';
import  createStyleSheet  from '../utils/createStyleSheet';

const defaultStyle = createStyleSheet({
	flex: 1,
	overflow: 'auto',
}, 'View');

const  Page = (props) => {

	const View = BR.Components.get('View');

	const { children, style } = this.props;
	return (<View style={[defaultStyle, style]}>{children}</View>);
};

export default withBlueRain(Page);
