import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { View } from '../../';
import { ViewProperties } from 'react-native';

export interface SystemAppProps extends ViewProperties {}

/**
 * Main SystemApp. This is the component that renders content to the screen.
 */
export class SystemApp extends React.PureComponent<SystemAppProps> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		const { children, ...rest } = this.props;

		const SystemHeader = BB.Components.resolve('SystemHeader');
		const SystemContent = BB.Components.resolve('SystemContent');
		const SystemFooter = BB.Components.resolve('SystemFooter');

		return (
			<View {...rest}>
				<SystemHeader />
				<SystemContent />
				<SystemFooter />
			</View>
		);
	}
}