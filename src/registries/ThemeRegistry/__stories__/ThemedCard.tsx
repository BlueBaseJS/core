import { BlueBase, BlueBaseContext } from '../../../';
import { TextStyle, ViewStyle } from 'react-native';
import React from 'react';

export interface ThemedCardProps {
	styles?: {
		root: ViewStyle,
		text: TextStyle,
	}
}

export class ThemedCard extends React.PureComponent<ThemedCardProps> {

	static contextType = BlueBaseContext;

	static defaultStyles: { root: ViewStyle, text: TextStyle } = {
		root: {
			backgroundColor: 'red',
			borderRadius: 5,
			height: 150,
			justifyContent: 'center',
			width: 150,
		},

		text: {
			color: 'white',
			textAlign: 'center',
		}
	};

	render() {
		const BB: BlueBase = (this as any).context;
		const { styles, children } = this.props;
		return (
			<BB.Components.View style={styles && styles.root}>
				<BB.Components.Text style={styles && styles.text}>
					{children}
				</BB.Components.Text>
			</BB.Components.View>
		);
	}
}
