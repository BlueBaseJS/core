import React from 'react';
import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';

export class EmptyState extends React.PureComponent {

	render() {

		return (
			<BlueRainConsumer children={(BR: BlueRain) => (
				<BR.Components.ComponentState title="Empty area" description="No data found." />
			)} />
		);
	}
}
