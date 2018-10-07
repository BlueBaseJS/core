import React from 'react';
import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';

export class ErrorState extends React.PureComponent {

	render() {

		return (
			<BlueRainConsumer children={(BR: BlueRain) => (
				<BR.Components.ComponentState
					title="Something broke!"
					description="An unknown error has occured. Please try again later."
				/>
			)} />
		);
	}
}
