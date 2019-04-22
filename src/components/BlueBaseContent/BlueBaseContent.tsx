import { MaybeRenderPropChildren, renderChildrenWithProps } from '../../utils';
import { StyleProp, ViewStyle } from 'react-native';
import { BlueBase } from '../../BlueBase';
import { NavigatorProps } from '@bluebase/components';
import React from 'react';
import { Theme } from '../../registries';
import { View } from '../../getComponent';

export interface BlueBaseContentStyles {
	backdrop: StyleProp<ViewStyle>;
}

export interface BlueBaseContentProps {
	BB: BlueBase,
	children?: MaybeRenderPropChildren<{ BB: BlueBase }>,
	navigator: NavigatorProps,
	styles?: Partial<BlueBaseContentStyles>,
}

/**
 * 🏡 BlueBaseContent
 * @param props
 */
export const BlueBaseContent = (props: BlueBaseContentProps) => {

	const { BB, children, navigator, styles: _styles } = props;
	const styles = _styles as BlueBaseContentStyles;

	const Navigation = BB.Components.resolve('Navigation');

	return (children)
	? renderChildrenWithProps(children, { BB })
	: (
		<View key="bluebase-wrapper" style={styles.backdrop}>
			<Navigation navigator={navigator} />
		</View>
	);
};

BlueBaseContent.defaultStyles = (theme: Theme) => ({
	backdrop: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	}
});