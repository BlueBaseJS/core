import React from 'react';
import { withBlueRain, BlueRainType } from '../index';

import Icon from '../components/Icon';

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
const IndexPage = (props: { bluerain: any }) => {

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
							image: () => <Icon title="BR" color="rgba(0,123,255,1)" />,
							title: 'Welcome to BlueRain OS!',
						}
					}
				]
			}
		]
	};

	return BR.Utils.parseJsonSchema(schema);
};

export default withBlueRain(IndexPage);
