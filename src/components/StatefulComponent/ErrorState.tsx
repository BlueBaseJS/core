import { BlueRain, withBlueRain } from '../../index';
import Icon from '../Icon';
import React from 'react';

const ErrorIcon = () => <Icon title="Error" />;

const ErrorState = (props: { bluerain: BlueRain }) => {

	const BR = props.bluerain;

	return (
		<BR.Components.ComponentState
			title="Something broke!"
			description="An unknown error has occured. Please try again later."
			image={ErrorIcon}
		/>
	);
};

export default withBlueRain(ErrorState);
