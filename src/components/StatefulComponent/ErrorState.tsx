import { BlueRainType,withBlueRain } from '../../index';
import Icon from '../Icon';
import React from 'react';

const ErrorIcon = () => <Icon title="Error" />;

const ErrorState = (props: { bluerain: BlueRainType }) => {

	const BR = props.bluerain;

	const ComponentState = BR.Components.get('ComponentState');

	return (
		<ComponentState
			title="Something broke!"
			description="An unknown error has occured. Please try again later."
			image={ErrorIcon}
		/>
	);
};

export default withBlueRain(ErrorState);
