import React from 'react';
import { withBlueRain, BlueRainType } from '../index';

import Icon from '../components/Icon';

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
const NotFoundPage = (props: { bluerain: BlueRainType }) => {

	const BR = props.bluerain;

	const pageStyle = {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	};

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

	return BR.Utils.parseJsonSchema(schema);
};

export default withBlueRain(NotFoundPage);
