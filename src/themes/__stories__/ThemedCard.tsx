import React from 'react';
import { TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';

import { getComponent } from '../../getComponent';
import { MaybeThunk } from '../../utils';
import { Theme } from '../Theme';

const View = getComponent<ViewProps>('View');
const Text = getComponent<TextProps>('Text');

export interface ThemedCardProps {
	children?: React.ReactNode;
	styles?: {
		root: ViewStyle;
		text: TextStyle;
	};
}

export class ThemedCard extends React.PureComponent<ThemedCardProps> {
	static defaultStyles: MaybeThunk<{ root: ViewStyle; text: TextStyle }> = (theme: Theme) => ({
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
		},
	});

	render() {
		const { styles, children } = this.props;
		return (
			<View style={styles && styles.root}>
				<Text style={styles && styles.text}>{children as any}</Text>
			</View>
		);
	}
}
