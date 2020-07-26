import { TextProps, ViewProps } from 'react-native';

import React from 'react';
import { getComponent } from '../../getComponent';
import { useTheme } from '../../hooks';

export const Body1 = getComponent<TextProps>('Body1');
export const View = getComponent<ViewProps>('View');

export interface ThemeDemoProps {
	children?: React.ReactNode;
}

export const ThemeDemo = ({ children }: any) => {
	const { theme } = useTheme();

	const mainStyle = {
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit,
	};

	return (
		<View style={mainStyle} testID="box">
			<Body1>{theme.name}</Body1>
			{children}
		</View>
	);
};
