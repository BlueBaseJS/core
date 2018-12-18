import { BlueBase, BlueBaseContext } from '../..';
import { TextStyle, ViewStyle } from 'react-native';
import { MaybeThunk } from '../../utils';
import React from 'react';
import { Theme } from '../../registries/ThemeRegistry';

export interface ThemedCardProps {
	styles?: {
		root: ViewStyle,
		text: TextStyle,
	}
}

export class ThemedCard extends React.PureComponent<ThemedCardProps> {

	static contextType = BlueBaseContext;

	static defaultStyles: MaybeThunk<{ root: ViewStyle, text: TextStyle }> = (theme: Theme) => ({
		root: {
			backgroundColor: theme.palette.background.card,
			borderRadius: theme.shape.borderRadius,
			height: 150,
			justifyContent: 'center',
			padding: theme.spacing.unit,
			width: 150,
		},

		text: {
			color: theme.palette.text.primary,
			textAlign: 'center',
		}
	})

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
