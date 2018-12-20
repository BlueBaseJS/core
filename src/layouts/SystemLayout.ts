import { BlueRain, withBlueRain } from '../index';
import { ViewProperties, ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface SystemLayoutProperties extends ViewProperties {
	children: React.ReactNode[];
	style: ViewStyle;
}

class SystemLayout extends React.PureComponent<
	SystemLayoutProperties & { bluerain: BlueRain },
	any
> {
	render() {
		const { style, children, bluerain: BR, ...other } = this.props;
		const stylesheet = [{ flex: 1 }, style || {}];
		const schema = {
			component: 'View',
			text: children,
			props: {
				style: stylesheet,
				...other
			}
		};
		const layout = BR.Filters.run('bluerain.system.app.layout', schema, this.props);
		return BR.API.JsonToReact.parse(layout);
	}
}

export default withBlueRain(SystemLayout);