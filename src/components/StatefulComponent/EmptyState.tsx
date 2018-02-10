import { BlueRain, withBlueRain } from '../../index';
import React from 'react';

const EmptyState = (props: { bluerain: BlueRain }) => {

	const BR = props.bluerain;

	return <BR.Components.ComponentState title="Empty area" description="No data found." />;
};

export default withBlueRain(EmptyState);
