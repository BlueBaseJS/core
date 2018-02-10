import { BlueRain, withBlueRain } from '../index';
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
const NotFoundPage = ({ bluerain: BR }: { bluerain: BlueRain }) => (
	<BR.Components.Wallpaper>
		<BR.Components.Page>
			<BR.Components.CenterLayout style={{ padding: 20 }}>
				<BR.Components.ComponentState
					title="Page not found!"
					description="This is a bit embarassing, but we seem to have misplaced your page. 😢"
					image={FOFIcon}
				/>
			</BR.Components.CenterLayout>
		</BR.Components.Page>
	</BR.Components.Wallpaper>
);

export default withBlueRain(NotFoundPage);
