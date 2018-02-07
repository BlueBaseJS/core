import { BlueRainType, withBlueRain } from '../index';
import { ViewProperties, ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface SystemLayoutProperties extends ViewProperties {
	children: React.ReactNode[];
	style: ViewStyle;
}

const SystemLayout = (props: SystemLayoutProperties & { bluerain: BlueRainType }) => {
	const { style, children, bluerain: BR, ...other } = props;

	const stylesheet = [
		BR.Utils.createStyleSheet({ flex: 1 }),
		BR.Utils.createStyleSheet(style || {})
	];

	const schema = {
		component: 'View',
		text: children,
		props: {
			style: stylesheet,
			...other
		}
	};

	const layout = BR.Filters.run('bluerain.system.app.layout', schema, props);
	return BR.API.JsonToReact.parse(layout);
};

export default withBlueRain(SystemLayout);
