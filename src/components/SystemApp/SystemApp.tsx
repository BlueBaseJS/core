import { View, ViewProperties, ViewStyle } from 'react-native';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';

export interface SystemAppProps extends ViewProperties {
	styles: {
		content: ViewStyle,
		footer: ViewStyle,
		header: ViewStyle,
		root: ViewStyle,
	}
}

/**
 * Main SystemApp. This is the component that renders content to the screen.
 */
export class SystemApp extends React.PureComponent<SystemAppProps> {

	static contextType = BlueBaseContext;

	static defaultStyles = {

		// SystemContent styles
		content: {
			flex: 1,
		},

		// SystemFooter styles
		footer: {},

		// SystemHeader styles
		header: {},

		// Root container styles
		root: {
			flex: 1,
		},
	};

	render() {

		const BB: BlueBase = this.context;

		const { children, style, styles, ...rest } = this.props;

		const SystemHeader = BB.Components.resolve('SystemHeader');
		const SystemContent = BB.Components.resolve('SystemContent');
		const SystemFooter = BB.Components.resolve('SystemFooter');

		return (
			<View style={[styles.root, style]} {...rest}>
				<SystemHeader style={styles.header} />
				<SystemContent style={styles.content}>{children}</SystemContent>
				<SystemFooter style={styles.footer} />
			</View>
		);
	}
}