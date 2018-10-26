import React, { ReactNode } from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';

export interface SystemContentProperties {
	children: ReactNode
}

export class SystemContent extends React.PureComponent<SystemContentProperties> {

	render() {

		return (
			<BlueBaseConsumer>
				{(BB: BlueBase) => (
					<BB.Components.View {...this.props}>
						<BB.Components.Text>
							💧 BlueBase System Content!
						</BB.Components.Text>
						{this.props.children}
					</BB.Components.View>
				)}
			</BlueBaseConsumer>
		);
	}
}