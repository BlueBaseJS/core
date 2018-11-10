import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import React from 'react';

// TODO: show actual error in dev mode
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
