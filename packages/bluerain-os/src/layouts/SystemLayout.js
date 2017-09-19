/* @flow */
import React from 'react';
import RX from 'reactxp';

import { withWindowInfo } from '../plugins/WindowInfoPlugin';

const defaultStyle = RX.Styles.createViewStyle({}, false);

class SystemLayout extends RX.Component {

	onLayout: Function;

	constructor(props) {
		super(props);
		this.onLayout = this.onLayout.bind(this);
	}

	/**
	 * Whenever the screen/window size changes, notify redux to
	 * update `state.bluerain.window` object.
	 */
	onLayout() {
		const newDimentions = RX.UserInterface.measureWindow();
		const oldDimentions = this.props.window;

		if (newDimentions.width !== oldDimentions.width || newDimentions.height !== oldDimentions.height) {
			this.props.setWindowDimentions(newDimentions.width, newDimentions.height);
		}
	}

	render() {
		const { children, style } = this.props;
		return (<RX.View onLayout={this.onLayout} style={[defaultStyle, style]}>{children}</RX.View>);
	}
}

export default withWindowInfo(SystemLayout);
