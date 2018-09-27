import React, { ReactNode } from 'react';
import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';

export interface SystemContentProperties {
	children: ReactNode
}

export class SystemContent extends React.PureComponent<SystemContentProperties> {

	render() {

		return (
			<BlueRainConsumer>
				{(BR: BlueRain) => (
					<BR.Components.View {...this.props}>
						<BR.Components.Text>
							💧 BlueRain System Content!
						</BR.Components.Text>
						{this.props.children}
					</BR.Components.View>
				)}
			</BlueRainConsumer>
		);
	}
}