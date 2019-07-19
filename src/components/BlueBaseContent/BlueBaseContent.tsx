import { MaybeRenderPropChildren, renderChildrenWithProps } from '../../utils';
import { StatusBar, StyleProp, ViewStyle } from 'react-native';
import { View, getComponent } from '../../getComponent';

import { BlueBase } from '../../BlueBase';
import { NavigatorProps } from '@bluebase/components';
import React from 'react';
import { Theme } from '../../registries';

const Navigation = getComponent('Navigation');

export interface BlueBaseContentStyles {
	backdrop: StyleProp<ViewStyle>;
}

export interface BlueBaseContentProps {
	BB: BlueBase;
	children?: MaybeRenderPropChildren<{ BB: BlueBase }>;
	navigator: NavigatorProps;
	styles?: Partial<BlueBaseContentStyles>;
}

/**
 * 🏡 BlueBaseContent
 * @param props
 */
export const BlueBaseContent = (props: BlueBaseContentProps) => {
	const { BB, children, navigator, styles } = props;

	const statusBarStyle = BB.Configs.getValue('statusBarStyle');

	return children ? (
		renderChildrenWithProps(children, { BB })
	) : (
		<View key="bluebase-wrapper" style={styles!.backdrop}>
			<StatusBar translucent barStyle={statusBarStyle} />
			<Navigation navigator={navigator} />
		</View>
	);
};

BlueBaseContent.defaultStyles = (theme: Theme) => ({
	backdrop: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	},
});
