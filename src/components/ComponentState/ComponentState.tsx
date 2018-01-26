import React from 'react';
import { ViewProperties, ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { withBlueRain, BlueRainType } from '../../index';

export interface ComponentStateProps extends ViewProperties {
	/**
	 * Image Component, if provided, imageSource will be ignored
	 */
	image?: React.ComponentType;

	/**
	 * Image styles
	 */
	imageStyle?: ImageStyle;

	/**
	 * Image source
	 */
	imageSource?: string;

	/**
	 * Title text
	 */
	title: string;

	/**
	 * Title style
	 */
	titleStyle?: TextStyle;

	/**
	 * Description Text
	 */
	description: string;

	/**
	 * Description style
	 */
	descriptionStyle?: TextStyle;

	/**
	 * Button Component, if provided, other button props will be ignored
	 */
	button?: React.ComponentType;

	/**
	 * Button title
	 */
	buttonTitle?: string;

	/**
	 * Button styles
	 */
	buttonStyle?: ViewStyle;

	/**
	 * Button onPress handler
	 */
	buttonOnPress?: Function;

	style:ViewStyle
}

const ComponentState = (props: ComponentStateProps & { bluerain: BlueRainType }) => {

	const {
		image: ImageComponent,
		imageSource,
		title,
		description,
		button: ButtonComponent,
		buttonTitle,
		buttonOnPress,
		bluerain: BR
	} = props;
	const View = BR.Components.get('View');
	const Text = BR.Components.get('Text');
	const Image = BR.Components.get('Image');
	const Button = BR.Components.get('Button');

	const style = BR.Utils.createStyleSheet([{
		alignItems: 'center',
		padding: 16,
	}, props.style]);

	const titleStyle = BR.Utils.createStyleSheet([{}, props.titleStyle]);
	const descriptionStyle = BR.Utils.createStyleSheet([{}, props.descriptionStyle]);

	// Image
	const imageStyle = BR.Utils.createStyleSheet([{
		width: 100
	}, props.imageStyle]);

	let ImageC = ImageComponent || null;
	if (!ImageC && imageSource) {
		ImageC = () => (<Image style={imageStyle} source={imageSource} />);
	}

	// Button
	const buttonStyle = BR.Utils.createStyleSheet([{
		paddingTop: 16
	}, props.buttonStyle]);

	let ButtonC = ButtonComponent || null;
	if (!ButtonC && buttonTitle) {
		ButtonC = () => (<Button style={buttonStyle} onPress={buttonOnPress} title={buttonTitle} />);
	}

	return (
  <View style={style}>
    {(ImageC) ? <ImageC /> : null}
    {(title) ? <Text style={titleStyle} >{title}</Text> : null}
    {(description) ? <Text style={descriptionStyle} >{description}</Text> : null}
    {(ButtonC) ? <ButtonC /> : null}
  </View>
	);
};

export default withBlueRain(ComponentState);
