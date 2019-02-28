import { Body2, Button, H6, Image, View } from '../../getComponent';
import { ImageProps, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { ButtonProps } from '../../native';
import React from 'react';
import { Theme } from '../../registries';

export interface ComponentStateStyles {

	/** Action button container styles */
	actionRoot?: ViewStyle,

	/** Description text styles */
	description?: TextStyle,

	/** Image styles */
	image?: ImageStyle,

	/** Styles of image container view */
	imageRoot?: ViewStyle,

	/** Main root container styles */
	root?: ViewStyle,

	/** Title styles */
	title?: TextStyle,
}
export interface ComponentStateProps {

	/**
	 * Action title
	 */
	actionTitle?: string;

	/**
	 * Action onPress callback function
	 */
	actionOnPress?: ButtonProps['onPress'];

	/**
	 * Description Text
	 */
	description?: string;

	/**
	 * A ReactNode to show custom UI, if provided, imageSource will be ignored
	 */
	image?: React.ReactNode;

	/**
	 * Image source
	 */
	imageSource?: ImageProps['source'];

	/**
	 * Title text
	 */
	title?: string;

	styles?: ComponentStateStyles;

  /**
   * Used to locate this view in end-to-end tests.
   */
	testID?: string,
}

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
						? <View style={styles.imageRoot}><Image style={styles.image} source={imageSource} /></View>
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
