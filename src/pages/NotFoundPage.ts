import RX from 'reactxp';
import React from 'react';
import { parseJsonSchema } from '../utils/JsonSchemaToReact';

const pageStyle = RX.Styles.createViewStyle(
	{
		justifyContent: 'center',
		padding: 20
	},
	false
);

const titleStyle = [
	RX.Styles.createViewStyle(
		{
			alignSelf: 'center',
			backgroundColor: 'rgb(220,53,69)',
			borderColor: 'rgb(220,53,69)',
			borderRadius: 10,
			borderWidth: 1,
			marginBottom: 20,
			padding: 20,
			shadowOffset: { height: 5, width: 0 },
			shadowRadius: 15,
			shadowColor: 'rgba(0,0,0,.3)'
		},
		false
	),
	{ textAlign: 'center', color: '#fff', fontSize: 68 }
];

const subTitleStyle = [
	RX.Styles.createViewStyle(
		{
			marginBottom: 20
		},
		false
	),
	{ textAlign: 'center', color: 'rgb(150, 150, 150)', overflow: 'initial' }
];

/**
 * Returns the 404 Page layout.
 *
 * @returns {React.Component} The layout react component
 */
export default function NotFoundPage() {
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
}
