import { BlueBaseImage, Body2, Button, FormattedMessage, H6, View } from '../../getComponent';
import { ButtonProps, ComponentStateProps, ComponentStateStyles } from '@bluebase/components';

import React from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '../../registries';

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
export class ComponentState extends React.PureComponent<ComponentStateProps> {
	static defaultStyles = (theme: Theme) => ({
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
	})

	render() {
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
		} = this.props;

		const styles = this.props.styles as ComponentStateStyles;

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
			style: StyleSheet.flatten([styles.image, _imageProps.style]),
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
	}
}
