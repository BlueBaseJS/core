import React from 'react';
import { parseJsonSchema } from '../utils/JsonSchemaToReact';
import BR from '../index';

/**
 * Returns the 404 Page layout.
 *
 * @returns {React.Component} The layout react component
 */
export default () => {
	const pageStyle = BR.Utils.createStyleSheet.create(
		{
			justifyContent: 'center',
			padding: 20
		},
		'View'
	);

	const titleStyle = BR.Utils.createStyleSheet.create(
		{
			alignSelf: 'center',
			textAlign: 'center',
			backgroundColor: 'rgb(220,53,69)',
			borderColor: 'rgb(220,53,69)',
			borderRadius: 10,
			borderWidth: 1,
			color: '#fff',
			fontSize: 68,
			marginBottom: 20,
			padding: 20,
			shadowOffset: { height: 5, width: 0 },
			shadowRadius: 15,
			shadowColor: 'rgba(0,0,0,.3)'
		},
		'Text'
	);

	const subTitleStyle = BR.Utils.createStyleSheet.create(
		{
			textAlign: 'center',
			color: 'rgb(150, 150, 150)',
			marginBottom: 20,
			overflow: 'initial'
		},
		'Text'
	);

	const schema = {
		component: 'Page',
		props: { style: pageStyle },
		children: [
			{
				component: 'View',
				children: [
					{
						props: { style: titleStyle },
						component: 'Text',
						text: '404'
					}
				]
			},
			{
				component: 'Text',
				props: { style: subTitleStyle },
				text: 'Page not found!'
			}
		]
	};

	return parseJsonSchema(schema);
};
