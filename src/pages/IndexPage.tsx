import { BlueRain, withBlueRain, } from '../index';

// Components
import Icon from '../components/Icon';

import React from 'react';


// Custom Components
const BRIcon = () => <Icon title="BR" color="rgba(0,123,255,1)" />;

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
const IndexPage = (props: { bluerain: BlueRain }) => {

	const BR = props.bluerain;

	const CenterLayout = BR.Components.get('CenterLayout');
	const ComponentState = BR.Components.get('ComponentState');
	const Page = BR.Components.get('Page');
	const Wallpaper = BR.Components.get('Wallpaper');

	return (
		<Wallpaper>
			<Page>
				<CenterLayout style={{ padding: 20 }}>
					<ComponentState
						title="Welcome to BlueRain OS!"
						image={BRIcon}
					/>
				</CenterLayout>
			</Page>
		</Wallpaper>
	);
};

export default withBlueRain(IndexPage);
