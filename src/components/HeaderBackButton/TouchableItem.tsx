/**
 * TouchableItem renders a touchable that looks native on both iOS and Android.
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity.
 *
 * On iOS you can pass the props of TouchableOpacity, on Android pass the props
 * of TouchableNativeFeedback.
 */
import {
	Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import { View } from '../../getComponent';
import isnil from 'lodash.isnil';

// import BorderlessButton from './BorderlessButton';

const ANDROID_VERSION_LOLLIPOP = 21;

export interface TouchableItemProps {
	borderless?: boolean,
	pressColor?: string,
	children: React.ReactNode,
	href?: string,

	[key: string]: any,
}

export default class TouchableItem extends React.Component<TouchableItemProps> {

	public static defaultProps: Partial<TouchableItemProps> = {
		borderless: false,
		pressColor: 'rgba(0, 0, 0, .32)',
	};

	render() {
    /*
     * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
     * therefore only enable it on Android Lollipop and above.
     *
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
		if (
      Platform.OS === 'android' &&
      Platform.Version >= ANDROID_VERSION_LOLLIPOP
    ) {
			const { style, ...rest } = this.props;
			return (
        <TouchableNativeFeedback
          {...rest}
          style={null}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor as string,
            this.props.borderless
          )}
        >
          <View style={style}>{React.Children.only(this.props.children)}</View>
        </TouchableNativeFeedback>
			);
		}
		else if (Platform.OS === 'ios') {
			// FIXME: Add borderless button
			return (
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
          // disallowInterruption={true}
          {...this.props}
        >
          {this.props.children}
        </TouchableOpacity>
			);
			// return (
      //   <BorderlessButton
      //     hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      //     disallowInterruption={true}
      //     {...this.props}
      //   >
      //     {this.props.children}
      //   </BorderlessButton>
			// );
		} else if (
				Platform.OS === 'web' &&
				!isnil(this.props.href) &&
				this.props.href !== ''
			) {
			return (
				<a {...this.props} />
			);
		}
		else {
			return (
        <TouchableOpacity {...this.props}>
          {this.props.children}
        </TouchableOpacity>
			);
		}
	}
}