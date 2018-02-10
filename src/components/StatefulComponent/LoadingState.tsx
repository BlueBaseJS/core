import { BlueRain, withBlueRain } from '../../index';
import React from 'react';

const LoadingState = (props: { bluerain: BlueRain }) => {

	const BR = props.bluerain;

	const Indicator = () => <BR.Components.ActivityIndicator color="#eeeeee" size="large" />;

	return <BR.Components.ComponentState title="Loading, Please wait." image={Indicator} />;
};

export default withBlueRain(LoadingState);
