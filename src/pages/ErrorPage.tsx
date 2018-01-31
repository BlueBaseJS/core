import React from 'react';
import { withBlueRain, BlueRainType } from '../index';

// Components
import Icon from './Icon';

// Custom Components
const ErrorIcon = () => <Icon title="Error" />;

/**
 * Returns the Error Page.
 *
 * @returns {React.Component} The layout react component
 */
const ErrorPage = (props: { bluerain: BlueRainType }) => {

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
						title="Something broke!"
						description="An unknown error has occured. Please try again later."
						image={ErrorIcon}
					/>
				</CenterLayout>
			</Page>
		</Wallpaper>
	);
};

export default withBlueRain(ErrorPage);
