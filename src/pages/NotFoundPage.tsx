import React from 'react';
import { parseJsonSchema } from '../utils/JsonSchemaToReact';
import BR from '../index';

import Icon from '../components/Icon';

/**
 * Returns the 404 Page layout.
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
							image: () => <Icon title={404} />,
							title: 'Page not found!',
							description: 'This is a bit embarassing, but we seem to have misplaced your page. 😢',
						}
					}
				]
			}
		]
	};

	return parseJsonSchema(schema);
};
