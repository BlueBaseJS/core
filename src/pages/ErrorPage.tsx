import { BlueRain, withBlueRain } from '../index';
import React from 'react';

/**
 * Returns the Error Page.
 *
 * @returns {React.Component} The layout react component
 */
const ErrorPage = (props: { bluerain: BlueRain }) => {

	const BR = props.bluerain;

	const CenterLayout = BR.Components.get('CenterLayout');
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
