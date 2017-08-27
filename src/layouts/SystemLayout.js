/* @flow */
import React from 'react';
import RX from 'reactxp';

import { withWindowInfo } from '../plugins/window';

const defaultStyle = RX.Styles.createViewStyle({
	width: '100%',
	height: '100%',
}, false);

class SystemLayout extends RX.Component {

	constructor(props) {
		super(props);
		this.onLayout = this.onLayout.bind(this);
	}

	/**
	 * Whenever the screen/window size changes, notify redux to
	 * update `state.bluerain.window` object.
	 */
	onLayout() {
		const dimentions = RX.UserInterface.measureWindow();
		this.props.setWindowDimentions(dimentions.width, dimentions.height);
	}

	render() {
		const { children, style } = this.props;
		return (<RX.View onLayout={this.onLayout} style={[defaultStyle, style]}> {children} </RX.View>);
	}
}

export default withWindowInfo(SystemLayout);
