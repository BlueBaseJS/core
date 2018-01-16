import React from 'react';
import BR from '../index';
import { parseJsonSchema } from '../utils/JsonSchemaToReact';

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
const IndexPage = props => {
	const Style = BR.Utils.createStyleSheet({
		pageStyle: {
			justifyContent: 'center',
			padding: 20
		},
		titleStyle: {
			alignSelf: 'center',
			backgroundColor: 'rgba(0,123,255,1)',
			borderColor: 'rgba(0,123,255,1)',
			borderRadius: 10,
			borderWidth: 1,
			color: '#fff',
			textAlign: 'center',
			fontSize: 68,
			marginBottom: 20,
			padding: 20,
			shadowOffset: { height: 5, width: 0 },
			shadowRadius: 15,
			shadowColor: 'rgba(0,0,0,.3)'
		},
		subTitleStyle: {
			color: 'rgb(150, 150, 150)',
			marginBottom: 20,
			textAlign: 'center'
		}
	});

	const schema = {
		component: 'Page',
		props: { style: Style.pageStyle },
		children: [
			{
				component: 'View',
				children: [
					{
						component: 'Text',
						props: { style: Style.titleStyle },
						text: 'BR'
					}
				]
			},
			{
				component: 'Text',
				props: { style: Style.subTitleStyle },
				text: 'Welcome to BlueRain OS!'
			}
		]
	};

	return parseJsonSchema(schema);
};

export default IndexPage;
