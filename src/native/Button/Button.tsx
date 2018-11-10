import {
	Platform,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View
} from 'react-native';
import React from 'react';
import { styles } from './styles';

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
			disabled,
			testID,
		} = this.props;
		const buttonStyles: any[] = [styles.button];
		const textStyles: any[] = [styles.text];
		if (color) {
			if (Platform.OS === 'ios') {
				textStyles.push({ color: color });
			} else {
				buttonStyles.push({ backgroundColor: color });
			}
		}
		const accessibilityStates: any = [];
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
				testID={testID}
				disabled={disabled}
				onPress={onPress}
			>
				<View style={buttonStyles}>
					{typeof children === 'string'
						? <Text style={textStyles}>{children}</Text>
						: children
					}
				</View>
			</Touchable>
		);
	}
}
