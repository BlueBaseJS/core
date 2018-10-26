import React from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';

export class LoadingState extends React.PureComponent {

	render() {

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => (
				<BB.Components.ActivityIndicator />
			)} />
		);
	}
}
