import React from 'react';
import { ViewProperties } from 'react-native';
import { withBlueRain, BlueRainType } from '../index';

export interface SystemLayoutProperties extends ViewProperties {
	children: React.ReactNode[];
}

const SystemLayout = (props: SystemLayoutProperties & { bluerain: BlueRainType }) => {
	const { style, children, bluerain: BR, ...other } = props;

	const stylesheet = BR.Utils.createStyleSheet([{ flex: 1 }, style]);

	const schema = {
		component: 'View',
		text: children,
		props: {
			style: stylesheet,
			...other
		}
	};

	const layout = BR.Filters.run('bluerain.system.app.layout', schema, props);
	return BR.Utils.parseJsonSchema(layout);
};

export default withBlueRain(SystemLayout);
