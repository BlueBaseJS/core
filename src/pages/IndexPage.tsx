import React from 'react';
import { parseJsonSchema } from '../utils/JsonSchemaToReact';
import BR from '../index';

import Icon from '../components/Icon';

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
export default () => {
	const pageStyle = BR.Utils.createStyleSheet({
		justifyContent: 'center',
		padding: 20
	});

	const schema = {
		component: 'Wallpaper',
		children: [
			{
				component: 'Page',
				props: { style: pageStyle },
				children: [
					{
						component: 'ComponentState',
						props: {
							image: () => <Icon title="BR" color="rgba(0,123,255,1)" />,
							title: 'Welcome to BlueRain OS!',
						}
					}
				]
			}
		]
	};

	return parseJsonSchema(schema);
};
