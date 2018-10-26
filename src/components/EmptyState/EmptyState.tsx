import React from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';

export class EmptyState extends React.PureComponent {

	render() {

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => (
				<BB.Components.ComponentState title="Empty area" description="No data found." />
			)} />
		);
	}
}
