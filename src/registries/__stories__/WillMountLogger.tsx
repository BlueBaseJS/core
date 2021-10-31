/* eslint-disable react/no-deprecated */
import React from 'react';
import { Text, View } from 'react-native';

export class WillMountLogger extends React.Component<any> {
	private mounts: number = 0;
	private unmounts: number = 0;

	componentWillMount() {
		this.mounts = this.mounts + 1;

		// tslint:disable-next-line: no-console
		console.log(`Mounts: ${this.mounts}`);
	}

	componentWillUnMount() {
		this.unmounts = this.unmounts + 1;

		// tslint:disable-next-line: no-console
		console.log(`Unounts: ${this.unmounts}`);
	}

	render() {
		return (
			<View>
				<Text>Mounts {this.mounts}</Text>
				<Text>Unmounts {this.unmounts}</Text>
				<Text>Renders {this.props.renders}</Text>
			</View>
		);
	}
}
