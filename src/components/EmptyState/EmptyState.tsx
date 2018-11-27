import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import React from 'react';

export interface EmptyStateProps {}

export class EmptyState extends React.PureComponent<EmptyStateProps> {

	render() {

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => (
				<BB.Components.ComponentState title="Empty area" description="No data found." />
			)} />
		);
	}
}
