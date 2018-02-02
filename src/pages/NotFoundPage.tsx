import { BlueRainType, withBlueRain } from '../index';
import Icon from '../components/Icon';
import React from 'react';

// Components

// Custom Components
const FOFIcon = () => <Icon title="404" />;

/**
 * Returns the 404 Page.
 *
 * @returns {React.Component} The layout react component
 */
const NotFoundPage = (props: { bluerain: BlueRainType }) => {

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
						title="Page not found!"
						description="This is a bit embarassing, but we seem to have misplaced your page. 😢"
						image={FOFIcon}
					/>
				</CenterLayout>
			</Page>
		</Wallpaper>
	);
};

export default withBlueRain(NotFoundPage);
