
import React from 'react';
import RX from 'reactxp';
import { withBlueRain } from '../Provider';

const defaultStyle = RX.Styles.createViewStyle(
	{
		flex: 1,
		// overflow: 'auto'
	},
	false
);
export interface IPageProps {
	style:{[key: string]: any};
}
class Page extends RX.Component<IPageProps, {}> {
	render() {
		const { children, style } = this.props;
		return <RX.View style={[defaultStyle, style]}>{children}</RX.View>;
	}
}

export default withBlueRain(Page);
