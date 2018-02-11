import { BlueRain, withBlueRain } from '../index';
import React from 'react';

/**
 * Returns the Error Page.
 *
 * @returns {React.Component} The layout react component
 */
const ErrorPage = ({ bluerain: BR }: { bluerain: BlueRain }) => (
	<BR.Components.Wallpaper>
		<BR.Components.Page>
			<BR.Components.CenterLayout style={{ padding: 20 }}>
				<BR.Components.ErrorState />
			</BR.Components.CenterLayout>
		</BR.Components.Page>
	</BR.Components.Wallpaper>
);

export default withBlueRain(ErrorPage);
