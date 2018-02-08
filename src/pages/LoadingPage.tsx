import { BlueRain, withBlueRain } from '../index';
import React from 'react';

/**
 * Returns the Loading Page.
 *
 * @returns {React.Component} The layout react component
 */
const LoadingPage = (props: { bluerain: BlueRain }) => {

	const BR = props.bluerain;

	const CenterLayout = BR.Components.get('CenterLayout');
	const Page = BR.Components.get('Page');
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
