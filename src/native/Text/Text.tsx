import { Text as NativeText, TextProps as NativeTextProps, TextStyle } from 'react-native';
import React from 'react';
import { Theme } from '../../models';

export interface TextProps extends NativeTextProps {
	styles?: {
		root?: TextStyle
	}
}

export const Text = ({ styles, style, ...rest }: TextProps) => (
	<NativeText style={[styles && styles.root, style]} {...rest} />
);

Text.defaultStyles = (theme: Theme) => ({ root: theme.typography.body1 });
