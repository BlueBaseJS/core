import React from 'react';
import { withBlueRain, BlueRainType } from '../index';

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
	const ErrorState = BR.Components.get('ErrorState');

	return (
		<Wallpaper>
			<Page>
				<CenterLayout style={{ padding: 20 }}>
					<ErrorState />
				</CenterLayout>
			</Page>
		</Wallpaper>
	);
};

export default withBlueRain(ErrorPage);
