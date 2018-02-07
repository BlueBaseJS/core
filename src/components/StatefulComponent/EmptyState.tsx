import { BlueRainType, withBlueRain } from '../../index';
import React from 'react';

const EmptyState = (props: { bluerain: BlueRainType }) => {

	const BR = props.bluerain;

	const ComponentState = BR.Components.get('ComponentState');

	return (
		<ComponentState
			title="Empty area"
			description="No data found."
		/>
	);
};

export default withBlueRain(EmptyState);
