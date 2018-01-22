import React from 'react';
import { withBlueRain, BlueRainType } from '../index';

const SystemLayout = props => {
	const { style, Layout, children, bluerain: BR, ...other } = props;

	const stylesheet = BR.Utils.createStyleSheet([{ flex: 1 }, style]);

	const schema = {
		component: 'View',
		text: children,
		props: {
			onLayout: Layout,
			style: stylesheet,
			...other
		}
	};

	const layout = BR.Filters.run('bluerain.system.app.layout', schema, props);
	return BR.Utils.parseJsonSchema(layout);
};

export default withBlueRain(SystemLayout);
