import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import React from 'react';
import { ViewProperties } from 'react-native';

export interface SystemAppProps extends ViewProperties {}

export class SystemApp extends React.PureComponent<SystemAppProps> {

	render() {

		return (
			<BlueBaseConsumer>
				{(BB: BlueBase) => (
					<BB.Components.View {...this.props}>
						<BB.Components.SystemHeader />
						<BB.Components.SystemContent />
						<BB.Components.SystemFooter />
					</BB.Components.View>
				)}
			</BlueBaseConsumer>
		);
	}
}