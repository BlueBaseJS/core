/* @flow */
import React from 'react';
import RX from 'reactxp';
import { withBlueRain } from '../Provider';

const defaultStyle = RX.Styles.createViewStyle({
	flex: 1,
	overflow: 'auto',
}, false);

class Page extends RX.Component {

	render() {
		const { children, style } = this.props;
		return (<RX.View style={[defaultStyle, style]}>{children}</RX.View>);
	}
}

export default withBlueRain(Page);
