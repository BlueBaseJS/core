
import { BlueRainType,withBlueRain } from '../../index';
import { ButtonProperties, ImageStyle,TextStyle,ViewProperties,ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import ComponentStateButton from './ComponentStateButton';
import ComponentStateImage from './ComponentStateImage';
import ComponentStateText from './ComponentStateText';
import React from 'react';

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

	style?: ViewStyle
}

const ComponentState = (props: ComponentStateProps & { bluerain: BlueRainType }) => {
	const {
		title,
		titleStyle,
		description,
		descriptionStyle,
		bluerain: BR
	} = props;

	const View = BR.Components.get('View');
	const Text = BR.Components.get('Text');

	const style = {
		alignItems: 'center',
		padding: 16,
		...props.style
	};

	const titleStylesheet = {
		fontSize: 18,
		fontWeight: 600,
		...titleStyle
 	};

	return (
  <View style={BR.Utils.createStyleSheet(style)}>
    <ComponentStateImage {...props} />
    <ComponentStateText text={title} style={titleStylesheet} bluerain={BR} />
    <ComponentStateText text={description} style={descriptionStyle} bluerain={BR} />
    <ComponentStateButton {...props} />
  </View>
	);
};

export default withBlueRain(ComponentState);
