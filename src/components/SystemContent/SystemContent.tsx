import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { ViewProperties } from 'react-native';

export interface SystemContentProps extends ViewProperties {}

export class SystemContent extends React.PureComponent<ViewProperties> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		return (
			<BB.Components.View {...this.props}>
				<BB.Components.Text>
					🚀 BlueBase System Content!
				</BB.Components.Text>
				{this.props.children}
			</BB.Components.View>
		);
	}
}