import RX from 'reactxp';
import React from 'react';
import { parseJsonSchema, ComponentSchema } from '../utils/JsonSchemaToReact';

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
			backgroundColor: 'rgba(0,123,255,1)',
			borderColor: 'rgba(0,123,255,1)',
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
	{ color: '#fff', textAlign: 'center', fontSize: 68 }
];

const subTitleStyle = [
	RX.Styles.createViewStyle(
		{
			marginBottom: 20
		},
		false
	),
	{ color: 'rgb(150, 150, 150)', textAlign: 'center' }
];

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
export default function IndexPage() {
	const schema: ComponentSchema = {
		component: 'Page',
		props: { style: pageStyle },
		children: [
			{
				component: 'View',
				children: [
					{
						component: 'Text',
						props: { style: titleStyle },
						text: 'BR'
					}
				]
			},
			{
				component: 'Text',
				props: { style: subTitleStyle },
				text: 'Welcome to BlueRain OS!'
			}
		]
	};

	return parseJsonSchema(schema);
}
