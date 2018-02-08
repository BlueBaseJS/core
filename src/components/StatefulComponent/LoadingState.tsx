import { BlueRain, withBlueRain } from '../../index';
import React from 'react';

const LoadingState = (props: { bluerain: BlueRain }) => {

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
