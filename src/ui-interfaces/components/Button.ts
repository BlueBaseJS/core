import React from 'react';

export interface ButtonProps {

 /* Label to be passed as child. */
	children?: React.ReactNode;

	/** Style object for button's style. */
	style?: object; // TODO: do proper typings

	/* Color prop of type enum. */
	color?:
		| 'primary'
		| 'secondary'
		| 'warning'
		| 'info'
		| 'danger'
		| 'success'
		| 'light'
		| 'dark'
		| 'link'
		| 'accent'
		| 'default'
		| 'contrast'
		| 'inherit'
		| 'white';

	/**
	 * Callback function fired when button is pressed.
	 */
	onPress?: () => void;

	/**
	 * If true, renders a disabled button.
	 */
	disabled?: boolean;

	/**
	 * Supportive for Web only, href prop to move to a link.
	 */
	href?: string;

	/**
	 * If true, button is generated with 100% width of the cnotainer.
	 */
	fullWidth?: boolean;

	/**
	 * If true, shows active state of the button.
	 */
	active?: boolean;

	/**
	 * If true, button is generated with border, unsupportive for MaterialUI button.
	 */
	bordered?: boolean;

	/**
	 * If true, button is generated rounded (Native only).
	 */
	rounded?: boolean;

	/**
	 * Icon prop to show icon on the left side of label.
	 */
	iconLeft?: React.ReactNode;

	/**
	 * Icon prop to show icon on the right side of label.
	 */
	iconRight?: React.ReactNode;

	/**
	 * Fab prop to show floating action button, unsupportive for Bootstrap Button.
	 */
	fab?: boolean;

	/**
	 * If true, small button is generated (For MaterialUI button, small also works when fab is true).
	 */
	small?: boolean;

	/**
	 * If true, large button is generated. If both small and large are true then Large button is generated.
	 */
	large?: boolean;

	[key: string]: any;
}