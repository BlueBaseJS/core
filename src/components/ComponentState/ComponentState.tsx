import { Body2, Button, H6, Image, View } from '../../getComponent';
import { ImageStyle, TextStyle, ViewStyle,  } from 'react-native';
import { ButtonProps } from '../../native';
import React from 'react';
import { Theme } from '../../registries';

export interface ComponentStateStyles {

	/** Action button styles */
	actionRoot?: ViewStyle,

	/** Description text styles */
	description?: TextStyle,

	/** Image styles */
	image?: ImageStyle,

	/** Styles of root image view */
	imageRoot?: ViewStyle,

	/** Root View styles */
	root?: ViewStyle,

	/** Title style */
	title?: TextStyle,
}
export interface ComponentStateProps {

	/**
	 * Action title
	 */
	actionTitle?: string;

	/**
	 * Action onPress handler
	 */
	actionOnPress?: ButtonProps['onPress'];

	/**
	 * Description Text
	 */
	description?: string;

	/**
	 * Image Component, if provided, imageSource will be ignored
	 */
	image?: React.ReactNode;

	/**
	 * Image source
	 */
	imageSource?: string;

	/**
	 * Title text
	 */
	title?: string;

	styles?: ComponentStateStyles;
}

/**
 * 🤡 ComponentState
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
			flex: 1,
			justifyContent: 'center',
		},
		title: {
			marginBottom: theme.spacing.unit,
			textAlign: 'center',
		},
	})

	render() {

		const {
			actionOnPress,
			actionTitle,
			description,
			image,
			imageSource,
			title,
		} = this.props;

		const styles = this.props.styles as ComponentStateStyles;

		return (
			<View style={styles.root}>
				{image
					? <View style={styles.imageRoot}>{image}</View>
					: (imageSource
						? <View style={styles.imageRoot}><Image style={styles.image} source={{ uri: imageSource }} /></View>
						: null)
				}
				{title ? <H6 style={styles.title} children={title} /> : null}
				{description ? <Body2 style={styles.description} children={description} /> : null}
				{actionTitle
					? (
						<View style={styles.actionRoot}>
							<Button color="primary" onPress={actionOnPress} >
								{actionTitle}
							</Button>
						</View>
					)
					: null}
			</View>
		);
	}
}
