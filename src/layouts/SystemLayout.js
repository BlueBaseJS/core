/* @flow */
import React from 'react';
import RX from 'reactxp';

const defaultStyle = RX.Styles.createViewStyle({
	width: '100%',
	height: '100%',
}, false);

export default class SystemLayout extends RX.Component {

	render() {
		const { children, style } = this.props;
		return (<RX.View style={[defaultStyle, style]}> {children} </RX.View>);
	}
}
