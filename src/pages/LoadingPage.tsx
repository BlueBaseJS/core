import React from 'react';
import { withBlueRain, BlueRainType } from '../index';

/**
 * Returns the Loading Page.
 *
 * @returns {React.Component} The layout react component
 */
const LoadingPage = (props: { bluerain: BlueRainType }) => {

	const BR = props.bluerain;

	const CenterLayout = BR.Components.get('CenterLayout');
	const ComponentState = BR.Components.get('ComponentState');
	const Page = BR.Components.get('Page');
	const Wallpaper = BR.Components.get('Wallpaper');
	const LoadingState = BR.Components.get('LoadingState');

	return (
		<Page>
			<CenterLayout style={{ padding: 20 }}>
				<LoadingState />
			</CenterLayout>
		</Page>
	);
};

export default withBlueRain(LoadingPage);
