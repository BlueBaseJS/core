import { MaybeRenderPropChildren, renderChildrenWithProps } from '../../utils';
import { StatusBar, StyleProp, ViewStyle } from 'react-native';
import { View, getComponent } from '../../getComponent';

import { BlueBase } from '../../BlueBase';
import { BlueBaseFilter } from '../BlueBaseFilter';
import React from 'react';
import { Theme } from '../../registries';
import { useBlueBase } from '../../hooks';

const Navigation = getComponent('Navigation');

export interface BlueBaseContentStyles {
	backdrop: StyleProp<ViewStyle>;
}

export interface BlueBaseContentProps {
	children?: MaybeRenderPropChildren<{ BB: BlueBase }>;
	styles?: Partial<BlueBaseContentStyles>;
}

/**
 * 🏡 BlueBaseContent
 * @param props
 */
export const BlueBaseContent = (props: BlueBaseContentProps) => {
	const { children, styles } = props;
	const BB = useBlueBase();

	const statusBarStyle = BB.Configs.getValue('statusBarStyle');

	return children ? (
		renderChildrenWithProps(children, { BB })
	) : (
		<View key="bluebase-wrapper" style={styles!.backdrop}>
			<StatusBar translucent barStyle={statusBarStyle} />
			<BlueBaseFilter filter="bluebase.navigator.root" value={{}}>
				{navigator => <Navigation navigator={navigator} />}
			</BlueBaseFilter>
		</View>
	);
};

BlueBaseContent.defaultStyles = (theme: Theme) => ({
	backdrop: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	},
});
