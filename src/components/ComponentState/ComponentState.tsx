import {
	BlueBaseImageProps,
	Body2Props,
	ButtonProps,
	ComponentStateProps,
	ComponentStateStyles,
	FormattedMessageProps,
	H6Props,
} from '@bluebase/components';
import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';

import { useComponent, useStyles } from '../../hooks';
import { Theme } from '../../themes';

const defaultStyles = (theme: Theme): Partial<ComponentStateStyles> => ({
	actionRoot: {
		marginTop: theme.spacing.unit,
	},
	description: {
		marginBottom: theme.spacing.unit,
		textAlign: 'center',
	},
	image: {
		height: 250,
		width: 250,
	},
	imageRoot: {
		marginBottom: theme.spacing.unit * 2,
	},
	root: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center',
		padding: theme.spacing.unit * 2,
	},
	title: {
		marginBottom: theme.spacing.unit,
		textAlign: 'center',
	},
});

/**
 * # 🤡 ComponentState
 *
 * A generic component to show different states of a screen or a view. For example,
 * you may need to:
 *
 * - Show a loading state when data is loading,
 * - Show an empty state when there is not data to show on a screen.
 * - Show an error message when an exception occurs during execution.
 *
 * These are just a few examples. This component displays a message with an image, a title,
 * a description and a call to action button.
 *
 * ## Usage
 * ```jsx
 * <ComponentState
 *  title="Looks like your'e new here!"
 *  description="Start by creating your first entry."
 *  imageSource="https://picsum.photos/200"
 *  styles={{ image: { width: 100, height: 100 } }}
 *  actionTitle="Tap to Create"
 * />
 * ```
 */
export const ComponentState = (props: ComponentStateProps) => {
	const {
		actionOnPress,
		actionProps: _actionProps = {},
		actionTitle,
		description,
		descriptionProps: _descriptionProps = {},
		image,
		imageProps: _imageProps = {},
		imageSource,
		title,
		titleProps: _titleProps = {},
	} = props;

	const BlueBaseImage = useComponent<BlueBaseImageProps>('BlueBaseImage');
	const Button = useComponent<ButtonProps>('Button');
	const Body2 = useComponent<Body2Props>('Body2');
	const FormattedMessage = useComponent<FormattedMessageProps>('FormattedMessage');
	const H6 = useComponent<H6Props>('H6');
	const View = useComponent<ViewProps>('View');

	const styles = useStyles('ComponentState', props, defaultStyles);

	const actionProps: ButtonProps = {
		color: 'primary',
		..._actionProps,
		component: Button,
		onPress: actionOnPress,
		style: StyleSheet.flatten([styles.action, _actionProps.style]),
	};

	const descriptionProps = {
		..._descriptionProps,
		children: description,
		component: Body2,
		style: StyleSheet.flatten([styles.description, _descriptionProps.style]),
	};

	const titleProps = {
		..._titleProps,
		children: title,
		component: H6,
		style: StyleSheet.flatten([styles.title, _titleProps.style]),
	};

	const imageProps = {
		..._imageProps,
		source: imageSource || _imageProps.source,
		style: StyleSheet.flatten([styles.image, (_imageProps as any).style]),
	};

	return (
		<View style={styles.root}>
			{image ? (
				<View style={styles.imageRoot}>{image}</View>
			) : imageSource ? (
				<View style={styles.imageRoot}>
					<BlueBaseImage {...imageProps} />
				</View>
			) : null}
			{title ? <FormattedMessage {...titleProps} /> : null}
			{description ? <FormattedMessage {...descriptionProps} /> : null}
			{actionTitle ? (
				<View style={styles.actionRoot}>
					<FormattedMessage {...actionProps}>{actionTitle}</FormattedMessage>
				</View>
			) : null}
		</View>
	);
};

ComponentState.displayName = 'ComponentState';
