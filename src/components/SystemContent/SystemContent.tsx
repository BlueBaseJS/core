import { Text, View } from '../../getComponent';
import React from 'react';
import { ViewProperties } from 'react-native';

export interface SystemContentProps extends ViewProperties {}

export class SystemContent extends React.PureComponent<ViewProperties> {

	render() {

		return (
			<View {...this.props}>
				<Text>
					🚀 BlueBase System Content!
				</Text>
				{this.props.children}
			</View>
		);
	}
}