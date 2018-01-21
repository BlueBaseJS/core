import React from 'react';
import { withBlueRain, BlueRainType } from '../../index';

type ComponentStateProps = {
	/**
	 * Image Component, if provided, imageSource will be ignored
	 */
	image?: React.ComponentType,

	/**
	 * Image styles
	 */
	imageStyle?: {},

	/**
	 * Image source
	 */
	imageSource?: string,

	/**
	 * Title text
	 */
	title: string,

	/**
	 * Title style
	 */
	titleStyle?: {},

	/**
	 * Description Text
	 */
	description: string,

	/**
	 * Description style
	 */
	descriptionStyle?: {},

	/**
	 * Styles
	 */
	style?: {},

	/**
	 * Button Component, if provided, other button props will be ignored
	 */
	button?: React.ComponentType,

	/**
	 * Button title
	 */
	buttonTitle?: string,

	/**
	 * Button styles
	 */
	buttonStyle?: {},

	/**
	 * Button onPress handler
	 */
	buttonOnPress?: Function
};

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

// ComponentState.defaultProps = {
// 	tag: 'div',
// 	imageStyle: {
// 		width: '100px'
// 	},
// };

export default withBlueRain(ComponentState);
