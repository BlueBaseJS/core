import React from 'react';
import { View } from '../../getComponent';
import { ViewProperties } from 'react-native';

export interface SystemContentProps extends ViewProperties {
	children: React.ReactNode
}

export const SystemContent = ({ children, ...rest }: SystemContentProps) => (
	<View {...rest}>
		{children}
	</View>
);