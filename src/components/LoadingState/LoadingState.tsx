import React from 'react';
import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';

export class LoadingState extends React.PureComponent {

	render() {

		return (
			<BlueRainConsumer children={(BR: BlueRain) => (
				<BR.Components.ComponentState
					title="Loading, Please wait..."
				/>
			)} />
		);
	}
}
