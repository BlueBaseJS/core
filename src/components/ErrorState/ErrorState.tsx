import React from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';

export class ErrorState extends React.PureComponent {

	render() {

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => (
				<BB.Components.ComponentState
					title="Something broke!"
					description="An unknown error has occured. Please try again later."
				/>
			)} />
		);
	}
}
