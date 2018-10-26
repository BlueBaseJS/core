import React from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';

export interface ComponentStateProperties {

	/**
	 * Action title
	 */
	actionTitle?: string;

	/**
	 * Action styles
	 */
	actionStyle?: any; // TODO: Import interface from react-native

	/**
	 * Action onPress handler
	 */
	actionOnPress?: Function;

	/**
	 * Description Text
	 */
	description?: string;

	/**
	 * Description style
	 */
	descriptionStyle?: any;

	/**
	 * Image Component, if provided, imageSource will be ignored
	 */
	image?: React.ReactNode;

	/**
	 * Image styles
	 */
	imageStyle?: any;

	/**
	 * Image source
	 */
	imageSource?: string;

	/**
	 * Title text
	 */
	title?: string;

	/**
	 * Title style
	 */
	titleStyle?: any;
}

export class ComponentState extends React.PureComponent<ComponentStateProperties> {

	render() {

		const {
			actionOnPress,
			actionStyle,
			actionTitle,
			description,
			descriptionStyle,
			image,
			imageSource,
			imageStyle,
			title,
			titleStyle
		} = this.props;

		const imgStyle = {
			width: 250,
			height: 250,
			marginBottom: 10,
			...imageStyle
		};

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => (
				<BB.Components.View>
					{image ? image : (imageSource ? <BB.Components.Image style={imgStyle} source={imageSource} /> : null)}
					{title ? <BB.Components.Text style={titleStyle} children={title} /> : null}
					{description ? <BB.Components.Text style={descriptionStyle} children={description} /> : null}
					{actionTitle
						? (
							<BB.Components.Button style={actionStyle} onPress={actionOnPress}>
								<BB.Components.Text>{actionTitle}</BB.Components.Text>
							</BB.Components.Button>
						)
						: null}
				</BB.Components.View>
			)} />
		);
	}
}
