/* @flow */
import React, { type Node } from 'react';
import PropTypes from 'prop-types'; // ES6
import { withBlueRain } from '../Provider';
import BR from '../index';
const defaultStyle = BR.utils.createStyleSheet({
	flex: 1,
	overflow: 'auto',
}, 'View');

const  Page = (props) => {
	const { children, style, bluerain } = props;
	const View = bluerain.Components.get('View');
	return (<View style={[defaultStyle, style]}>{children}</View>);
};

Page.propTypes = {
	children:Node,
	style:PropTypes.Object,
	bluerain:PropTypes.Object

};
Page.defaultProps = {
	children:[],
	style:defaultStyle,
	bluerain:{} };

export default withBlueRain(Page);
