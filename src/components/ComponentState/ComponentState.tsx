import React from 'react';
import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';

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
			<BlueRainConsumer children={(BR: BlueRain) => (
				<BR.Components.View>
					{image ? image : (imageSource ? <BR.Components.Image style={imgStyle} source={imageSource} /> : null)}
					{title ? <BR.Components.Text style={titleStyle} children={title} /> : null}
					{description ? <BR.Components.Text style={descriptionStyle} children={description} /> : null}
					{actionTitle
						? (
							<BR.Components.Button style={actionStyle} onPress={actionOnPress}>
								<BR.Components.Text>{actionTitle}</BR.Components.Text>
							</BR.Components.Button>
						)
						: null}
				</BR.Components.View>
			)} />
		);
	}
}
