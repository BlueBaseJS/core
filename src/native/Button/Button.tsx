import React from 'react';
import {
	Platform,
	Text,
	TextStyle,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

import { useStyles } from '../../hooks/useStyles';
import { Theme } from '../../themes/Theme';

export interface ButtonStyles {
	root: ViewStyle;
	primary: ViewStyle;
	secondary: ViewStyle;
	default: ViewStyle;
	link: ViewStyle;
	fullWidth: ViewStyle;
	text: TextStyle;
	primaryText: TextStyle;
	secondaryText: TextStyle;
	defaultText: TextStyle;
	linkText: TextStyle;
}

export interface ButtonProps {
	[key: string]: any;

	/* Label to be passed as child. */
	children?: React.ReactNode;

	/* Color prop of type enum. */
	color?: 'primary' | 'secondary' | 'link' | 'default';

	/**
	 * Callback function fired when button is pressed.
	 */
	onPress?: (event?: any) => any;

	/**
	 * If true, renders a disabled button.
	 */
	disabled?: boolean;

	/**
	 * If true, button is generated with 100% width of the container.
	 */
	fullWidth?: boolean;

	/**
	 * If true, shows active state of the button.
	 */
	active?: boolean;

	/**
	 * The size of the button.
	 */
	size?: 'small' | 'medium' | 'large';

	/**
	 * Button Styles
	 */
	styles?: ButtonStyles;

	/**
	 * Used to locate this view in end-to-end tests.
	 */
	testID?: string;
}

const defaultStyles = (theme: Theme): ButtonStyles => ({
	default: {
		backgroundColor: theme.palette.background.default,
	},
	defaultText: {},
	fullWidth: {
		alignSelf: 'stretch',
	},
	link: {},
	linkText: {},
	primary: {
		backgroundColor: theme.palette.primary.main,
	},
	primaryText: {
		color: theme.palette.primary.contrastText,
	},
	root: {
		alignSelf: 'flex-start',
		borderRadius: theme.shape.borderRadius,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit,
	},
	secondary: {
		backgroundColor: theme.palette.secondary.main,
	},
	secondaryText: {
		color: theme.palette.secondary.contrastText,
	},
	text: {
		...theme.typography.button,
		textAlign: 'center',
	},
});

/**
 * A basic button component that should render nicely on any platform. Supports
 * a minimal level of customization.
 */
export const Button = (props: ButtonProps) => {
	const {
		color = 'default',
		onPress,
		children,
		disabled,
		fullWidth,
		// active,
		// size,
		testID,
	} = props;

	const styles = useStyles('Button', props, defaultStyles);

	const rootStyles: ViewStyle[] = [styles.root];
	const textStyles: TextStyle[] = [styles.text];

	if (color === 'default') {
		rootStyles.push(styles.default);
		textStyles.push(styles.defaultText);
	}

	if (color === 'primary') {
		rootStyles.push(styles.primary);
		textStyles.push(styles.primaryText);
	}

	if (color === 'secondary') {
		rootStyles.push(styles.secondary);
		textStyles.push(styles.secondaryText);
	}

	if (color === 'link') {
		rootStyles.push(styles.link);
		textStyles.push(styles.linkText);
	}

	if (fullWidth === true) {
		rootStyles.push(styles.fullWidth);
	}

	const Touchable: React.ComponentType<any> =
		Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
	return (
		<Touchable role="button" disabled={disabled} onPress={onPress}>
			<View style={rootStyles} testID={testID}>
				{typeof children === 'string' ? <Text style={textStyles}>{children}</Text> : children}
			</View>
		</Touchable>
	);
};

Button.displayName = 'Button';
