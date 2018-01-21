import React from 'react';
import BR from '../index';

const SystemLayout = props => {
	const { style, Layout, children, ...other } = props;

	const stylesheet = BR.Utils.createStyleSheet([
		{
			flex: 1
			// overflow: 'auto',
			// flexDirection: 'row'
		},
		style
	]);

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

export default SystemLayout;
