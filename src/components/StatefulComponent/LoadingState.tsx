import React from 'react';
import { withBlueRain, BlueRainType } from '../../index';

const LoadingState = (props: { bluerain: BlueRainType }) => {

	const BR = props.bluerain;

	const ActivityIndicator = BR.Components.get('ActivityIndicator');
	const ComponentState = BR.Components.get('ComponentState');

	const Indicator = () => <ActivityIndicator color="#eeeeee" size="large" />;
	return (
		<ComponentState
			title="Loading, Please wait."
			image={Indicator}
		/>
	);
};

export default withBlueRain(LoadingState);
