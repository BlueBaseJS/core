import { Platform, TouchableNativeFeedback, TouchableOpacity, ViewProps } from 'react-native';

import React from 'react';
import { TouchableItemProps } from '@bluebase/components';
import { useComponent } from '../../hooks';

// import BorderlessButton from './BorderlessButton';

const ANDROID_VERSION_LOLLIPOP = 21;

/**
 * TouchableItem renders a touchable that looks native on both iOS and Android.
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity.
 *
 * On iOS you can pass the props of TouchableOpacity, on Android pass the props
 * of TouchableNativeFeedback.
 *
 * Code taken from react-navigation project
 */

export const TouchableItem = (props: TouchableItemProps & { children: React.ReactNode }) => {
	const View = useComponent<ViewProps>('View');

	/*
	 * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
	 * therefore only enable it on Android Lollipop and above.
	 *
	 * All touchables on Android should have the ripple effect according to
	 * platform design guidelines.
	 * We need to pass the background prop to specify a borderless ripple effect.
	 */
	if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
		const { style, ...rest } = props;
		return (
			<TouchableNativeFeedback
				{...rest}
				style={null}
				background={TouchableNativeFeedback.Ripple(props.pressColor as string, props.borderless)}
			>
				<View style={style}>{React.Children.only(props.children)}</View>
			</TouchableNativeFeedback>
		);
	} else if (Platform.OS === 'ios') {
		// FIXME: Add borderless button
		return (
			<TouchableOpacity
				hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
				// disallowInterruption={true}
				{...props}
			>
				{props.children}
			</TouchableOpacity>
		);
		// return (
		//   <BorderlessButton
		//     hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
		//     disallowInterruption={true}
		//     {...props}
		//   >
		//     {props.children}
		//   </BorderlessButton>
		// );
	} else {
		return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
	}
};

TouchableItem.displayName = 'TouchableItem';

TouchableItem.defaultProps = {
	borderless: false,
	pressColor: 'rgba(0, 0, 0, .32)', // TODO: Extract this from theme
};
