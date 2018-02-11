import { BlueRain, withBlueRain } from '../index';
import React from 'react';

/**
 * Returns the Loading Page.
 *
 * @returns {React.Component} The layout react component
 */
const LoadingPage = ({ bluerain: BR }: { bluerain: BlueRain }) => (
	<BR.Components.Page>
		<BR.Components.CenterLayout style={{ padding: 20 }}>
			<BR.Components.LoadingState />
		</BR.Components.CenterLayout>
	</BR.Components.Page>
);

export default withBlueRain(LoadingPage);
