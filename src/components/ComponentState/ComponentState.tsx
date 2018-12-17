import { Button, H6, Image, Text, View } from '../..';
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

export class ComponentState extends React.PureComponent<ComponentStateProps> {

	static defaultStyles = (theme: Theme) => ({
		actionRoot: {
			marginTop: theme.spacing.unit,
		},
		description: {
			textAlign: 'center',
		},
		image: {
			height: 250,
			marginBottom: 10,
			width: 250,
		},
		root: {
			alignItems: 'center',
		},
		title: {
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
				{image ? image : (imageSource ? <Image style={styles.image} source={{ uri: imageSource }} /> : null)}
				{title ? <H6 style={styles.title} children={title} /> : null}
				{description ? <Text style={styles.description} children={description} /> : null}
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
