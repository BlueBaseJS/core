import {
	Platform,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View
} from 'react-native';
import React from 'react';

export type ButtonProps = {
  /**
   * Text to display inside the button
   */
	children: React.ReactNode,

	/**
	 * Handler to be called when the user taps the button
	 */
	onPress: (event?: any) => any,

	/**
	 * Color of the text (iOS), or background color of the button (Android)
	 */
	color?: string,

	/**
	 * TV preferred focus (see documentation for the View component).
	 */
	hasTVPreferredFocus?: boolean,

	/**
	 * Text to display for blindness accessibility features
	 */
	accessibilityLabel?: string,

	/**
	 * If true, disable all interactions for this component.
	 */
	disabled?: boolean,

	/**
	 * Used to locate this view in end-to-end tests.
	 */
	testID?: string,
};

/**
 * A basic button component that should render nicely on any platform. Supports
 * a minimal level of customization.
 *
 * If this button doesn't look right for your app, you can build your own
 * button using [TouchableOpacity](docs/touchableopacity.html)
 * or [TouchableNativeFeedback](docs/touchablenativefeedback.html).
 *
 * Example usage:
 *
 * ```
 * import { Button } from 'react-native';
 * ...
 *
 * <Button
 *   onPress={onPressLearnMore}
 *   color="#841584"
 *   accessibilityLabel="Learn more about this purple button"
 * />
 * Learn More
 * </Button>
 * ```
 *
 */

export class Button extends React.Component<ButtonProps> {
	render() {
		const {
			accessibilityLabel,
			color,
			onPress,
			children,
			hasTVPreferredFocus,
			disabled,
			testID,
		} = this.props;
		const buttonStyles = [styles.button];
		const textStyles = [styles.text];
		if (color) {
			if (Platform.OS === 'ios') {
				textStyles.push({ color: color });
			} else {
				buttonStyles.push({ backgroundColor: color });
			}
		}
		const accessibilityStates = [];
		if (disabled) {
			buttonStyles.push(styles.buttonDisabled);
			textStyles.push(styles.textDisabled);
			accessibilityStates.push('disabled');
		}
		const Touchable =
			Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
		return (
			<Touchable
				accessibilityLabel={accessibilityLabel}
				accessibilityRole="button"
				accessibilityStates={accessibilityStates}
				hasTVPreferredFocus={hasTVPreferredFocus}
				testID={testID}
				disabled={disabled}
				onPress={onPress}
			>
				<View style={buttonStyles}>
					{typeof children === 'string'
						? <Text style={textStyles} disabled={disabled}>{children}</Text>
						: children
					}
				</View>
			</Touchable>
		);
	}
}

const styles = StyleSheet.create({
	button: Platform.select({
		android: {
			// Material design blue from https://material.google.com/style/color.html#color-color-palette
			backgroundColor: '#2196F3',
			borderRadius: 2,
			elevation: 4,
		},
		ios: {},
		web: {
			// Material design blue from https://material.google.com/style/color.html#color-color-palette
			backgroundColor: '#2196F3',
			borderRadius: 2,
			color: 'white',
			fontWeight: '500',
			padding: 8,
			textAlign: 'center',
		},
	}),
	buttonDisabled: Platform.select({
		android: {
			backgroundColor: '#dfdfdf',
			elevation: 0,
		},
		ios: {},
	}),
	text: Platform.select({
		android: {
			color: 'white',
			fontWeight: '500',
			padding: 8,
			textAlign: 'center',
		},
		ios: {
			// iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
			color: '#007AFF',
			fontSize: 18,
			padding: 8,
			textAlign: 'center',
		},
		web: {
			color: 'white',
			fontWeight: '500',
			padding: 8,
			textAlign: 'center',
		},
	}),
	textDisabled: Platform.select({
		android: {
			color: '#a1a1a1',
		},
		ios: {
			color: '#cdcdcd',
		},
	}),
});
