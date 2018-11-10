import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import React from 'react';
import { ViewProperties } from 'react-native';

export interface SystemContentProps extends ViewProperties {}


export class SystemContent extends React.PureComponent<ViewProperties> {

	render() {

		return (
			<BlueBaseConsumer>
				{(BB: BlueBase) => (
					<BB.Components.View {...this.props}>
						<BB.Components.Text>
							🚀 BlueBase System Content!
						</BB.Components.Text>
						{this.props.children}
					</BB.Components.View>
				)}
			</BlueBaseConsumer>
		);
	}
}