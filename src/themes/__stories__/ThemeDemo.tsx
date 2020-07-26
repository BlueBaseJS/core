import { Body1, View } from '../../getComponent';

import React from 'react';
import { useTheme } from '../../hooks';

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
