import React from 'react';
import BR from '../index';

const SystemLayout = props => {
	const defaultStyle = BR.Utils.createStyleSheet(
		{
			flex: 1,
			overflow: 'auto',
			flexDirection: 'row'
		},
		'View'
	);
	const { children, style, Layout, ...other } = props;
	const schema = {
		component: 'View',
		props: {
			onLayout: Layout,
			style: [defaultStyle, style],
			...other
		},
		children: [
			{
				component: 'View', // System Content
				text: children,
				props: { style: { flexGrow: 1, flex: 1 } }
			}
		]
	};
	const layout = BR.Filters.run('bluerain.system.app.layout', schema);
	return BR.Utils.parseJsonSchema(layout);
};

export default SystemLayout;
